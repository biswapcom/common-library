import { AbiItem } from 'web3-utils';
import { AddAccount, AddedAccount } from 'web3-core';
import { ContractDb, MulticallCall, Pair } from '@types';
import { Interface } from '@ethersproject/abi';
import { Contract } from 'web3-eth-contract';
import { toBN } from '@helpers';
import { ChainId } from '@enums';
import { defaultChainId, web3Config } from '@configs';
import { logService, requestService as request } from '@services';
import { INIT_CODE_HASH } from '@constants';
import { Db } from 'mongodb';
import BN from 'bignumber.js';
import Web3 from 'web3';
import * as tokens from '@constants/tokens';

BN.config({ EXPONENTIAL_AT: 1000000000 });

/**
 * Contains the most frequently used tools for working with contracts, tokens, etc. blockchain
 */
export class BlockchainService {
    private web3: Web3;
    private db: Db;

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

        const provider = new Web3.providers.HttpProvider(web3Config[chainId].httpHosts[0], { timeout: 6000 });
        this.web3 = new Web3(provider);

        // to avoid error "Number can only safely store up to 53 bits web3"
        this.web3.utils.hexToNumber = (v) => {
            try {
                return toBN(v).toNumber();
            } catch (e) {
                return 0;
            }
        };

        return this.web3;
    }

    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {AbiItem[]|string} abi
     * @param {string} address
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    getEthContract(abi: AbiItem[] | string, address: string, chainId: ChainId = defaultChainId): Contract {
        const web3 = this.getWeb3(chainId);
        const jsonInterface = (typeof abi === 'string') ? JSON.parse(abi) : abi;

        return new web3.eth.Contract(jsonInterface, address);
    }

    /**
     * Adds an account using a private key or account object to the wallet.
     *
     * @param [account] - A private key or account object created with web3.eth.accounts.create().
     * @param [chainId] - Chain ID to connect to the correct blockchain network
     */
    addWallet(account: string | AddAccount, chainId: ChainId = defaultChainId): AddedAccount {
        const web3 = this.getWeb3(chainId);

        return web3.eth.accounts.wallet.add(account);
    }

    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} name - Name of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    async getEthContractByName(name: string, chainId: ChainId = defaultChainId): Promise<Contract> {
        const contract: ContractDb = await this.getContractByName(name, chainId);

        return this.getEthContract(contract.abi, contract.address);
    }

    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} address - Address of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    async getEthContractByAddress(address: string, chainId: ChainId = defaultChainId): Promise<Contract> {
        const contract: ContractDb = await this.getContractByAddress(address, chainId);

        return this.getEthContract(contract.abi, contract.address);
    }

    /**
     * Ether ERC-721 contract object by token address.
     *
     * @param [address] - Token address
     * @param [chainId] - Chain ID to connect to the correct blockchain network
     */
    async getErc721Contract(address: string, chainId: ChainId = defaultChainId): Promise<Contract> {
        const erc721 = await this.getContractByName('erc721', chainId);

        return this.getEthContract(erc721.abi, address, chainId);
    }

    /**
     * Ether ERC-20 contract object by token address.
     *
     * @param [address] - Token address
     * @param [chainId] - Chain ID to connect to the correct blockchain network
     */
    async getErc20Contract(address: string, chainId: ChainId = defaultChainId): Promise<Contract> {
        const erc20 = await this.getContractByName('erc20', chainId);

        return this.getEthContract(erc20.abi, address, chainId);
    }

    /**
     * DB Contract by name
     *
     * @param {string} name - Name of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {ContractDb}
     */
    async getContractByName(name: string, chainId: ChainId = defaultChainId): Promise<ContractDb> {
        if (this.db) {
            const contract = await this.db.collection('contracts').findOne({ name, chainId });

            return contract as ContractDb;
        }

        return request.get(`contracts/${name}/name`, { chainId });
    }

    /**
     * DB Contract by address
     *
     * @param {string} address - Address of contract
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {ContractDb}
     */
    async getContractByAddress(address: string, chainId: ChainId = defaultChainId): Promise<ContractDb> {
        if (this.db) {
            const contract = await this.db.collection('contracts').findOne({ address: address.toLowerCase(), chainId });

            return contract as ContractDb;
        }

        return request.get(`contracts/${address.toLowerCase()}/address`, { chainId });
    }

    /**
     * Exchange liquidity provider token to USDT
     *
     * @param {string} amountFrom
     * @param {Pair} pair
     * @param {number} decimalPlaces - Decimal places, integer, 0 to 1e+9.
     * @param {number} chainId
     *
     * @return {string} - USDT in Wei
     */
    async exchangeLPTokenToUSD(
        amountFrom: string,
        pair: Pair,
        decimalPlaces: number = 0,
        chainId: ChainId = defaultChainId
    ): Promise<string> {
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
                .toFixed(decimalPlaces)
            : '0';
    }

    /**
     * Exchange ERC20 token to USDT
     *
     * @param {string} amountFrom - Exchange amount
     * @param {string} tokenFrom - Token address
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     *
     * @return {string} - USDT in Wei
     */
    async exchangeTokenToUSDT(amountFrom: string, tokenFrom: string, chainId: ChainId = defaultChainId, decimalPlaces: number = 0): Promise<string> {
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
            const pair = await this.getExchangePair(tokenFrom, chainId);

            if (!pair) {
                return '0';
            }

            [reserveA, reserveB] = [toBN(pair.reserveA), toBN(pair.reserveB)];

            coreTokenAmount = (pair.tokenA === tokenFrom) ? amount.multipliedBy(reserveB).div(reserveA) : amount.multipliedBy(reserveA).div(reserveB);
            coreToken = pair.tokenA === tokenFrom ? pair.tokenB : pair.tokenA;
        }

        if (coreToken === coreTokens.USDT) {
            return coreTokenAmount.toFixed(decimalPlaces);
        }

        const corePairTokens = [coreToken, coreTokens.USDT].sort();
        const corePair = await this.getCorePair(corePairTokens[0], corePairTokens[1], chainId);

        if (!corePair) {
            return '0';
        }

        [reserveA, reserveB] = [toBN(corePair.reserveA), toBN(corePair.reserveB)];

        const usdtAmount = (corePair.tokenA === coreToken)
            ? coreTokenAmount.multipliedBy(reserveB).div(reserveA)
            : coreTokenAmount.multipliedBy(reserveA).div(reserveB);

        return usdtAmount.toFixed(decimalPlaces);
    }

    /**
     * Core pair by token addresses
     *
     * @param {string} tokenA
     * @param {string} tokenB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     *
     * @return {Pair}
     * @private
     */
    private async getCorePair(tokenA: string, tokenB: string, chainId: number = defaultChainId): Promise<Pair | null> {
        if (this.db) {
            const corePair = await this.db.collection('pairs').findOne({
                tokenA: tokenA.toLowerCase(),
                tokenB: tokenB.toLowerCase()
                // chainId
            });

            if (corePair) {
                return corePair as Pair;
            }

            return null;
        }

        const corePairResponse = await request.get('pool/core-pair', {
            tokenA,
            tokenB,
            chainId
        });

        return corePairResponse.data as Pair;
    }

    private async getExchangePair(tokenFrom: string, chainId: number = defaultChainId): Promise<Pair> {
        const coreTokens: string[] = Object.values(this.getCoreTokens(chainId));

        if (this.db) {
            const tokensQuery = {
                // chainId,
                $or: coreTokens.map(tokenAddress => {
                    const tokens = [tokenFrom.toLowerCase(), tokenAddress.toLowerCase()].sort();

                    return {
                        tokenA: tokens[0],
                        tokenB: tokens[1],
                        swaps: { $gt: 50 }
                    };
                })
            };

            const [pair] = await this.db.collection('pairs').find(tokensQuery)
                .sort({ swaps: -1 })
                .limit(1)
                .toArray();

            if (pair) {
                return pair as Pair;
            }

            return null;
        }

        const exchangePair = await request.post('pool/exchange-pair', {
            tokenFrom,
            coreTokens,
            chainId
        });

        return exchangePair.data as Pair;
    }

    async multiCall(ABI, calls: MulticallCall[], chainId: ChainId = defaultChainId) {
        const callableAbi = new Interface(ABI);

        const callData = calls.map((call: MulticallCall) => [
            call.address.toLowerCase(),
            callableAbi.encodeFunctionData(call.name, call.params)
        ]);

        try {
            const multicall: ContractDb = await this.getContractByName('multicall', chainId);
            const multiCallContract = this.getEthContract(multicall['abi'], multicall['address'], chainId);
            const { returnData } = await multiCallContract.methods
                .aggregate(callData)
                .call();

            return returnData.map((call, i) => callableAbi.decodeFunctionResult(calls[i].name, call));
        } catch (e) {
            logService.error('Cannot execute multi call. ' + (e as Error).message);
        }
    }

    /**
     * List of farms addresses
     *
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     * @return {string[]}
     */
    async getFarmsAddresses(chainId: ChainId = defaultChainId): Promise<string[]> {
        const farm: ContractDb = await this.getContractByName('farm', chainId);
        const masterChefContract = this.getEthContract(farm.abi, farm.address);
        const poolsCount = await masterChefContract.methods.poolLength().call();
        const calls: MulticallCall[] = [];

        // skip BSW pool at 0 position
        for (let poolIndex = 1; poolIndex < poolsCount; poolIndex++) {
            calls.push({
                address: farm['address'],
                name: 'poolInfo',
                params: [poolIndex]
            });
        }

        const pools = await this.multiCall(farm.abi, calls);

        return pools.filter(pool => !pool.allocPoint.isZero()).map(pool => pool.lpToken.toLowerCase());
    }

    /**
     * Get pair address by tokens addresses
     *
     * @param {string} tokenA - Address of token A
     * @param {string} tokenB - Address of token B
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     *
     * @return {string} - Pair address
     */
    async getPairAddress(tokenA: string, tokenB: string, chainId: ChainId = defaultChainId): Promise<string> {
        const web3 = this.getWeb3(chainId);
        const [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];

        const abiEncoded1 = web3.eth.abi.encodeParameters(['address', 'address'], [token0, token1])
            .split('0'.repeat(24))
            .join('');

        const salt = web3.utils.soliditySha3(abiEncoded1);
        const factory: ContractDb = await this.getContractByName('factory', chainId);

        const abiEncoded2 = web3.eth.abi.encodeParameters(['address', 'bytes32'], [factory.address, salt])
            .split('0'.repeat(24))
            .join('')
            .substring(2);

        return '0x' + Web3.utils.soliditySha3('0xff' + abiEncoded2, INIT_CODE_HASH).substring(26);
    }

    /**
     * Get pair address by tokens addresses
     *
     * @param {string} pairAddress - Address of pair
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     *
     * @return {Pair} - Pair
     */
    async getPairByAddress(pairAddress: string, chainId: ChainId = defaultChainId): Promise<Pair | null> {
        if (!this.db){
            throw Error(`getPairByAddress:: call 'setDb' is required`)
        }
        const pair = await this.db.collection('pairs').findOne({ pairAddress: pairAddress.toLowerCase() });
        return pair as Pair;
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

    setDb(db: Db) {
        this.db = db;
    }

}

export const blockchainService = new BlockchainService();