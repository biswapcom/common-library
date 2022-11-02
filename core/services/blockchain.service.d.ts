import { AbiItem } from "web3-utils";
import { ContractDb, MulticallCall, Pair } from "../types";
import { Contract } from "web3-eth-contract";
import { ChainId } from "../enums";
import { Db } from "mongodb";
import Web3 from "web3";
/**
 * Contains the most frequently used tools for working with contracts, tokens, etc. blockchain
 */
export declare class BlockchainService {
    private web3;
    private db;
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
     * DB Contract by name
     *
     * @param {string} name - Name of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {ContractDb}
     */
    getContractByName(name: string, chainId?: ChainId): Promise<ContractDb>;
    /**
     * DB Contract by address
     *
     * @param {string} address - Address of contract
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {ContractDb}
     */
    getContractByAddress(address: string, chainId?: ChainId): Promise<ContractDb>;
    /**
     * Exchange liquidity provider token to USD
     *
     * @param {string} amountFrom
     * @param {Pair} pair
     * @param {number} chainId
     */
    exchangeLPTokenToUSD(amountFrom: string, pair: Pair, chainId?: ChainId): Promise<string>;
    /**
     * Exchange ERC20 token to USDT
     *
     * @param {string} amountFrom - Exchange amount
     * @param {string} tokenFrom - Token address
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     *
     * @return {string} - USDT in Wei
     */
    exchangeTokenToUSDT(amountFrom: string, tokenFrom: string, chainId?: ChainId): Promise<string>;
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
    private getCorePair;
    private getExchangePair;
    multiCall(ABI: any, calls: MulticallCall[], chainId?: ChainId): Promise<any>;
    /**
     * List of farms addresses
     *
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     * @return {string[]}
     */
    getFarmsAddresses(chainId?: ChainId): Promise<string[]>;
    /**
     * Get pair address by tokens addresses
     *
     * @param {string} tokenA - Address of token A
     * @param {string} tokenB - Address of token B
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     *
     * @return {string} - Pair address
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
    setDb(db: Db): void;
}
export declare const blockchainService: BlockchainService;
