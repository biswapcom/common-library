import { AbiItem } from "web3-utils";
import { MulticallCall, Pair } from "@types";
import { Contract } from "web3-eth-contract";
import { ChainId } from "@enums";
import Web3 from "web3";
/**
 * Contains the most frequently used tools for working with contracts, tokens, etc. blockchain
 */
export declare class BlockchainService {
    private web3;
    /**
     * Web3 HTTP-provider
     *
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Web3}
     */
    getWeb3(chainId?: ChainId): Web3;
    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {AbiItem[]|string} abi
     * @param {string} address
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    getEthContract(abi: AbiItem[] | string, address: string, chainId?: ChainId): Contract;
    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} name - Name of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    getEthContractByName(name: string, chainId?: ChainId): Promise<Contract>;
    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} address - Address of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    getEthContractByAddress(address: string, chainId?: ChainId): Promise<Contract>;
    /**
     * Exchange liquidity provider token to USD
     *
     * @param {string} amountFrom
     * @param {Pair} pair
     * @param {number} chainId
     */
    exchangeLPTokenToUSD(amountFrom: string, pair: Pair, chainId?: ChainId): Promise<string>;
    exchangeTokenToUSDT(amountFrom: string, tokenFrom: string, chainId?: ChainId): Promise<string>;
    multiCall(ABI: any, calls: MulticallCall[], chainId?: ChainId): Promise<any>;
    /**
     * List of launchpool addresses
     *
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     * @return {string[]}
     */
    getPoolAddresses(chainId?: ChainId): Promise<string[]>;
    /**
     * Generate pair address from tokens addresses
     *
     * @param {string} tokenA - Address of token A
     * @param {string} tokenB - Address of token B
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     */
    getPairAddress(tokenA: string, tokenB: string, chainId?: ChainId): Promise<string>;
    /**
     * List of core tokens
     *
     * @param {number} chainId
     */
    getCoreTokens(chainId?: ChainId): {
        [symbol: string]: string;
    };
    /**
     * Get symbol of token by address
     *
     * @param {string} address
     * @param {number} chainId
     */
    getTokenSymbolByAddress(address: string, chainId?: ChainId): string;
    /**
     * Get address of token by symbol
     *
     * @param {string} symbol
     * @param {number} chainId
     */
    getTokenAddressBySymbol(symbol: string, chainId?: ChainId): string;
}
export declare const blockchainService: BlockchainService;
