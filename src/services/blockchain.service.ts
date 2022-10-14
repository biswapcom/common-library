import { AbiItem } from "web3-utils";
import { MulticallCall, Pair } from "@types";
import { Interface } from '@ethersproject/abi';
import { Contract } from "web3-eth-contract";
import { toBN } from "@helpers";
import { ChainId } from "@enums";
import { defaultChainId, web3Config } from "@configs";
import { logService, requestService as request } from "@services";
import { INIT_CODE_HASH } from "@constants";
import BN from "bignumber.js";
import Web3 from "web3";
import * as tokens from "@constants/tokens";

BN.config({ EXPONENTIAL_AT: 1000000000 });

/**
 * Contains the most frequently used tools for working with contracts, tokens, etc. blockchain
 */
export class BlockchainService {
    private web3: Web3;

    /**
     * Web3 HTTP-provider
     *
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Web3}
     */
    getWeb3(chainId: ChainId = defaultChainId): Web3 {
        if (this.web3) {
            return this.web3;
        }

        const provider = new Web3.providers.HttpProvider(web3Config[chainId].httpHosts[0], { timeout: 6000 })

        return new Web3(provider);
    }

    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {AbiItem[]|string} abi
     * @param {string} address
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    getContract(abi: AbiItem[] | string, address: string, chainId: ChainId = defaultChainId): Contract {
        const web3 = this.getWeb3(chainId);
        const jsonInterface = (typeof abi === 'string') ? JSON.parse(abi) : abi;

        return new web3.eth.Contract(jsonInterface, address);
    }

    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} name - Name of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    async getContractByName(name: string, chainId: ChainId = defaultChainId): Promise<Contract> {
        const contract = await request.get(`contracts/${name}/name`, { chainId });

        return this.getContract(contract['abi'], contract['address']);
    }

    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} address - Address of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    async getContractByAddress(address: string, chainId: ChainId = defaultChainId): Promise<Contract> {
        const contract = await request.get(`contracts/${address.toLowerCase()}/address`, { chainId });

        return this.getContract(contract['abi'], contract['address']);
    }

    /**
     * Exchange liquidity provider token to USD
     *
     * @param {string} amountFrom
     * @param {Pair} pair
     * @param {number} chainId
     */
    async exchangeLPTokenToUSD(amountFrom: string, pair: Pair, chainId: ChainId = defaultChainId): Promise<string> {
        const liquidity = {
            a: await this.exchangeTokenToUSDT(pair.reserveA, pair.tokenA, chainId),
            b: await this.exchangeTokenToUSDT(pair.reserveB, pair.tokenB, chainId)
        };

        if (liquidity.a === '0') {
            liquidity.a = liquidity.b;
        }

        if (liquidity.b === '0') {
            liquidity.b = liquidity.a;
        }

        return pair.totalSupply && toBN(pair.totalSupply).isGreaterThan(0)
            ? toBN(liquidity.a)
                .plus(toBN(liquidity.b))
                .multipliedBy(toBN(amountFrom))
                .div(toBN(pair.totalSupply))
                .toString(10)
            : '0';
    }

    async exchangeTokenToUSDT(amountFrom: string, tokenFrom: string, chainId: ChainId = defaultChainId): Promise<string> {
        const amount = toBN(amountFrom);
        const coreTokens = this.getCoreTokens(chainId);

        tokenFrom = tokenFrom.toLowerCase();

        let reserveA: BN;
        let reserveB: BN;
        let coreTokenAmount: BN;
        let coreToken: string;

        if (Object.values(coreTokens).includes(tokenFrom)) {
            coreToken = tokenFrom;
            coreTokenAmount = amount;
        } else {
            const exchangePair = await request.post('pool/exchange-pair', {
                tokenFrom,
                coreTokens,
                chainId
            });

            const pair = exchangePair.data;

            if (!pair) {
                return '0';
            }

            [ reserveA, reserveB ] = [ toBN(pair.reserveA), toBN(pair.reserveB) ];

            coreTokenAmount = (pair.tokenA === tokenFrom) ? amount.multipliedBy(reserveB).div(reserveA) : amount.multipliedBy(reserveA).div(reserveB);
            coreToken = pair.tokenA === tokenFrom ? pair.tokenB : pair.tokenA;
        }

        if (coreToken === coreTokens.USDT) {
            return coreTokenAmount.toString(10);
        }

        const corePairTokens = [ coreToken, coreTokens.USDT ].sort();
        const corePairResponse = await request.get('pool/core-pair', {
            tokenA: corePairTokens[0],
            tokenB: corePairTokens[1],
            chainId
        });

        const corePair = corePairResponse.data;

        if (!corePair) {
            return '0';
        }

        [ reserveA, reserveB ] = [ toBN(corePair.reserveA), toBN(corePair.reserveB) ];

        const usdtAmount = (corePair.tokenA === coreToken)
            ? coreTokenAmount.multipliedBy(reserveB).div(reserveA)
            : coreTokenAmount.multipliedBy(reserveA).div(reserveB);

        return usdtAmount.toString(10);
    }

    async multiCall(ABI, calls: MulticallCall[], chainId: ChainId = defaultChainId) {
        const callableAbi = new Interface(ABI);

        const callData = calls.map((call: MulticallCall) => [
            call.address.toLowerCase(),
            callableAbi.encodeFunctionData(call.name, call.params),
        ]);

        try {
            const multicall = await request.get('contracts/multicall/name', { chainId });
            const multiCallContract = this.getContract(multicall['abi'], multicall['address'], chainId);
            const { returnData } = await multiCallContract.methods
                .aggregate(callData)
                .call();

            return returnData.map((call, i) => callableAbi.decodeFunctionResult(calls[i].name, call));
        } catch (e) {
            logService.error('Cannot execute multi call. ' + (e as Error).message);
        }
    }

    /**
     * List of launchpool addresses
     *
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     * @return {string[]}
     */
    async getPoolAddresses(chainId: ChainId = defaultChainId): Promise<string[]> {
        const farm = await request.get('contracts/farm/name', { chainId });
        const masterChefContract = this.getContract(farm['abi'], farm['address']);
        const poolsCount = await masterChefContract.methods.poolLength().call();
        const calls: MulticallCall[] = [];

        // skip BSW at 0 position
        for (let poolIndex = 1; poolIndex < poolsCount; poolIndex++) {
            calls.push({
                address: farm['address'],
                name: 'poolInfo',
                params: [ poolIndex ]
            });
        }

        const pools = await this.multiCall(farm['abi'], calls);

        return pools.filter(pool => !pool.allocPoint.isZero()).map(pool => pool.lpToken.toLowerCase());
    }

    /**
     * Generate pair address from tokens addresses
     *
     * @param {string} tokenA - Address of token A
     * @param {string} tokenB - Address of token B
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     */
    async getPairAddress(tokenA: string, tokenB: string, chainId: ChainId = defaultChainId): Promise<string> {
        const web3 = this.getWeb3(chainId);
        const [ token0, token1 ] = tokenA < tokenB ? [ tokenA, tokenB ] : [ tokenB, tokenA ];

        const abiEncoded1 = web3.eth.abi.encodeParameters([ 'address', 'address' ], [ token0, token1 ])
            .split('0'.repeat(24))
            .join('');

        const salt = web3.utils.soliditySha3(abiEncoded1);
        const factory = await request.get('contracts/factory/name', { chainId });

        const abiEncoded2 = web3.eth.abi.encodeParameters([ 'address', 'bytes32' ], [ factory['address'], salt ])
            .split('0'.repeat(24))
            .join('')
            .substring(2);

        return '0x' + Web3.utils.soliditySha3('0xff' + abiEncoded2, INIT_CODE_HASH).substring(26);
    }

    /**
     * List of core tokens
     *
     * @param {number} chainId
     */
    getCoreTokens(chainId: ChainId = defaultChainId): { [symbol: string]: string } {
        const coreTokens = {};

        for (const name in tokens) {
            // skip constants without chain id
            if (!tokens[name][chainId]) continue;

            const token = tokens[name][chainId];

            if (token.core) {
                coreTokens[token.symbol] = token.address.toLowerCase();
            }
        }

        return coreTokens;
    }

    /**
     * Get symbol of token by address
     *
     * @param {string} address
     * @param {number} chainId
     */
    getTokenSymbolByAddress(address: string, chainId: ChainId = defaultChainId): string {
        for (let key in tokens) {
            if (!tokens[key] || !tokens[key][chainId]) continue;

            if (tokens[key][chainId].address.toLowerCase() === address.toLowerCase()) {
                return tokens[key][chainId].symbol;
            }
        }

        throw Error(`Cannot find the token symbol by address "${address}"`);
    }

    /**
     * Get address of token by symbol
     *
     * @param {string} symbol
     * @param {number} chainId
     */
    getTokenAddressBySymbol(symbol: string, chainId: ChainId = defaultChainId): string {
        for (let key in tokens) {
            if (!tokens[key] || !tokens[key][chainId]) continue;

            if (tokens[key][chainId].symbol.toLowerCase() === symbol.toLowerCase()) {
                return tokens[key][chainId].address;
            }
        }

        throw Error(`Cannot find the token address by symbol "${symbol}"`);
    }

}

export const blockchainService = new BlockchainService();