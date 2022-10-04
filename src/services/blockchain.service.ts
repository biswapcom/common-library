import { toBN } from "@helpers";
import { Pair } from "@types";
import { ChainId } from "@enums";
import { defaultChainId } from "@configs";
import { apiService } from "@src/services/api.service";
import BN from "bignumber.js";
import * as tokens from "@constants/tokens";

BN.config({ EXPONENTIAL_AT: 1000000000 });

export class BlockchainService {

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
            const exchangePair = await apiService.post('pool/exchange-pair', {
                tokenFrom,
                coreTokens
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
        const corePairResponse = await apiService.get('pool/core-pair', {
            tokenA: corePairTokens[0],
            tokenB: corePairTokens[1],
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
    getSymbolByAddress(address: string, chainId: ChainId = defaultChainId): string {
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
    getAddressBySymbol(symbol: string, chainId: ChainId = defaultChainId): string {
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