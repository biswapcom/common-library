"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _BlockchainService_dfsFindPaths, _BlockchainService_buildGraph, _BlockchainService_checkDb, _BlockchainService_getCorePairsForTokenV2, _BlockchainService_getCorePairsForTokenV3, _BlockchainService_getCorePairsV3, _BlockchainService_getCorePairsV2;
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockchainService = exports.BlockchainService = void 0;
const _ = __importStar(require("lodash"));
const abi_1 = require("@ethersproject/abi");
const _helpers_1 = require("../helpers");
const _configs_1 = require("../configs");
const _services_1 = require("./");
const _constants_1 = require("../constants");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const web3_1 = __importDefault(require("web3"));
const tokens = __importStar(require("../constants/tokens"));
bignumber_js_1.default.config({ EXPONENTIAL_AT: 1000000000 });
/**
 * Contains the most frequently used tools for working with contracts, tokens, etc. blockchain
 */
class BlockchainService {
    constructor() {
        this.transparentContractName = 'transparent_upgradeable_proxy';
        /**
         * Build all paths for token from and token to
         * @param graph
         * @param start - token from
         * @param end - token to
         * @param visited
         * @param path
         * @param paths
         * @param allPath
         * @private
         */
        _BlockchainService_dfsFindPaths.set(this, (graph, start, end, visited = new Set(), path = [], paths = [], allPath = []) => {
            const PATH_LENGTH_LIMIT = 4;
            visited.add(start);
            path.push(start);
            if (path.length <= PATH_LENGTH_LIMIT) {
                if (start === end && path.length > 1) {
                    allPath.push([...path]);
                }
                else {
                    const neighbors = graph[start];
                    for (const neighbor of neighbors) {
                        if (!visited.has(neighbor)) {
                            __classPrivateFieldGet(this, _BlockchainService_dfsFindPaths, "f").call(this, graph, neighbor, end, visited, path, paths, allPath);
                        }
                    }
                }
            }
            visited.delete(start);
            path.pop();
            return _.sortBy(allPath, 'length');
        }
        /**
         * Build graph for tokens
         * @param tokensFrom
         * @param tokenTo
         * @param pairs
         * @private
         */
        );
        /**
         * Build graph for tokens
         * @param tokensFrom
         * @param tokenTo
         * @param pairs
         * @private
         */
        _BlockchainService_buildGraph.set(this, (tokensFrom, tokenTo, pairs) => {
            const graph = {};
            const tokensList = _.compact(_.uniq([...Object.values(BlockchainService.coreTokens), tokensFrom.toLowerCase(), tokenTo.toLowerCase()]));
            for (const tokenAddress of tokensList) {
                graph[tokenAddress] = [];
                for (const { tokenA, tokenB } of pairs) {
                    const tokens = [tokenA, tokenB];
                    if (tokens.includes(tokenAddress)) {
                        graph[tokenAddress].push(..._.without(tokens, tokenAddress));
                    }
                }
                graph[tokenAddress] = _.uniq(graph[tokenAddress]);
            }
            return graph;
        });
        _BlockchainService_checkDb.set(this, (handlerName = 'checkDb') => {
            if (!this.db) {
                throw Error(`${handlerName}:: call 'setDb' is required`);
            }
        });
        _BlockchainService_getCorePairsForTokenV2.set(this, async (tokenAddress) => {
            __classPrivateFieldGet(this, _BlockchainService_checkDb, "f").call(this, 'getCorePairsForTokenV2');
            return this.db.collection('pairs').find({
                $or: [
                    {
                        swaps: { $gt: 1000 },
                        tokenA: tokenAddress,
                        tokenB: { $in: Object.values(BlockchainService.coreTokens) }
                    },
                    {
                        swaps: { $gt: 1000 },
                        tokenA: { $in: Object.values(BlockchainService.coreTokens) },
                        tokenB: tokenAddress
                    }
                ]
            }, {
                projection: {
                    tokenA: 1,
                    tokenB: 1,
                },
            }).limit(1000).toArray();
        });
        _BlockchainService_getCorePairsForTokenV3.set(this, async (tokenAddress) => {
            __classPrivateFieldGet(this, _BlockchainService_checkDb, "f").call(this, 'getCorePairsForTokenV3');
            return this.db.collection('pools-v3').aggregate([
                {
                    $match: {
                        $or: [
                            {
                                tokenA: tokenAddress,
                                tokenB: { $in: Object.values(BlockchainService.coreTokens) }
                            },
                            {
                                tokenA: { $in: Object.values(BlockchainService.coreTokens) },
                                tokenB: tokenAddress
                            }
                        ]
                    }
                },
                {
                    $project: {
                        _id: null,
                        tokenA: '$tokenA',
                        tokenB: '$tokenB',
                    },
                }
            ]).toArray();
        });
        _BlockchainService_getCorePairsV3.set(this, async () => {
            __classPrivateFieldGet(this, _BlockchainService_checkDb, "f").call(this, 'getCorePairsV3');
            if (!this.corePairsV3) {
                this.corePairsV3 = await this.db.collection('pools-v3').aggregate([
                    {
                        $match: {
                            tokenA: { $in: Object.values(BlockchainService.coreTokens) },
                            tokenB: { $in: Object.values(BlockchainService.coreTokens) }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                tokenA: '$tokenA',
                                tokenB: '$tokenB',
                            },
                        },
                    },
                    {
                        $project: {
                            _id: null,
                            tokenA: '$_id.tokenA',
                            tokenB: '$_id.tokenB',
                        },
                    }
                ]).toArray();
                setTimeout(() => this.corePairsV3 = null, 1000 * 60 * 60 * 24);
            }
            return this.corePairsV3;
        });
        _BlockchainService_getCorePairsV2.set(this, async () => {
            __classPrivateFieldGet(this, _BlockchainService_checkDb, "f").call(this, 'getCorePairsV2');
            if (!this.corePairsV2) {
                this.corePairsV2 = await this.db.collection('pairs').find({
                    tokenA: { $in: Object.values(BlockchainService.coreTokens) },
                    tokenB: { $in: Object.values(BlockchainService.coreTokens) },
                    swaps: { $gt: 1000 }
                }, {
                    projection: {
                        tokenA: 1,
                        tokenB: 1,
                    },
                }).limit(1000).toArray();
                setTimeout(() => this.corePairsV2 = null, 1000 * 60 * 60 * 24);
            }
            return this.corePairsV2;
        }
        /**
         * Web3 HTTP-provider
         *
         * @param {number} chainId - Chain ID to connect to the correct blockchain network
         * @return {Web3}
         */
        );
    }
    async getTransparentContract(chainId = _configs_1.defaultChainId) {
        if (!this.transparentContract) {
            this.transparentContract = await this.getEthContractByName(this.transparentContractName, chainId);
        }
        return this.transparentContract;
    }
    /**
     * Get amount of input token in USDT for V2 and V3 protocols (works only for direct pairs)
     * @param amountFrom
     * @param tokenFrom
     * @param chainId
     */
    async getAmountUsd(amountFrom, tokenFrom, chainId = _configs_1.defaultChainId) {
        return Promise.all([
            this.getAmountUsdV2(amountFrom, tokenFrom, chainId),
            this.getAmountUsdV3(amountFrom, tokenFrom, chainId)
        ]).then(([v2, v3]) => ({ v2, v3 }));
    }
    isUsdt(tokenAddress, chainId = _configs_1.defaultChainId) {
        return tokenAddress.toLowerCase() === tokens.USDT[chainId].address.toLowerCase();
    }
    /**
     * Get amount of input token in USDT for V2 protocols
     * @param amountFrom
     * @param tokenFrom
     * @param chainId
     */
    async getAmountUsdV2(amountFrom, tokenFrom, chainId = _configs_1.defaultChainId) {
        if (!Number(amountFrom))
            return '0';
        tokenFrom = tokenFrom.toLowerCase();
        if (this.isUsdt(tokenFrom, chainId))
            return amountFrom;
        const contract = await this.getTransparentContract(chainId);
        const pairs = [...await __classPrivateFieldGet(this, _BlockchainService_getCorePairsV2, "f").call(this)];
        if (!Object.values(BlockchainService.coreTokens).includes(tokenFrom)) {
            pairs.push(...await __classPrivateFieldGet(this, _BlockchainService_getCorePairsForTokenV2, "f").call(this, tokenFrom));
        }
        const graph = __classPrivateFieldGet(this, _BlockchainService_buildGraph, "f").call(this, tokenFrom, tokens.USDT[chainId].address, pairs);
        const paths = __classPrivateFieldGet(this, _BlockchainService_dfsFindPaths, "f").call(this, graph, tokenFrom, tokens.USDT[chainId].address.toLowerCase());
        let result;
        if (!paths.length)
            throw Error(`Can't find path for searching price`);
        for (const path of paths) {
            result = amountFrom;
            for (const index in path) {
                const tokenA = path[index];
                const tokenB = path[Number(index) + 1];
                if (tokenB) {
                    result = await contract.methods.consultV2(tokenA, result, tokenB).call();
                    if (!result)
                        break;
                }
            }
            if (Number(result))
                return result;
        }
        return result;
    }
    /**
     * Get best amount of input token in USDT for V3 protocols
     * @param amountFrom
     * @param tokenFrom
     * @param chainId
     */
    async getAmountUsdV3(amountFrom, tokenFrom, chainId = _configs_1.defaultChainId) {
        if (!Number(amountFrom))
            return '0';
        tokenFrom = tokenFrom.toLowerCase();
        if (this.isUsdt(tokenFrom, chainId))
            return amountFrom;
        const contract = await this.getTransparentContract(chainId);
        const pairs = [...await __classPrivateFieldGet(this, _BlockchainService_getCorePairsV3, "f").call(this)];
        if (!Object.values(BlockchainService.coreTokens).includes(tokenFrom)) {
            pairs.push(...await __classPrivateFieldGet(this, _BlockchainService_getCorePairsForTokenV3, "f").call(this, tokenFrom));
        }
        const graph = __classPrivateFieldGet(this, _BlockchainService_buildGraph, "f").call(this, tokenFrom, tokens.USDT[chainId].address, pairs);
        const paths = __classPrivateFieldGet(this, _BlockchainService_dfsFindPaths, "f").call(this, graph, tokenFrom, tokens.USDT[chainId].address.toLowerCase());
        let result;
        if (!paths.length)
            throw Error(`Can't find path for searching price`);
        for (const path of paths) {
            result = amountFrom;
            for (const index in path) {
                const tokenA = path[index];
                const tokenB = path[Number(index) + 1];
                if (tokenB) {
                    result = await contract.methods.consultV3(tokenA, result, tokenB).call();
                    if (!result)
                        break;
                }
            }
            if (Number(result))
                return result;
        }
        return result;
    }
    /**
     * Web3 HTTP-provider
     *
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Web3}
     */
    getWeb3(chainId = _configs_1.defaultChainId) {
        if (this.web3) {
            return this.web3;
        }
        const provider = new web3_1.default.providers.HttpProvider(_configs_1.web3Config[chainId].httpHosts[0], { timeout: 6000 });
        this.web3 = new web3_1.default(provider);
        // to avoid error "Number can only safely store up to 53 bits web3"
        this.web3.utils.hexToNumber = (v) => {
            try {
                return (0, _helpers_1.toBN)(v).toNumber();
            }
            catch (e) {
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
    getEthContract(abi, address, chainId = _configs_1.defaultChainId) {
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
    addWallet(account, chainId = _configs_1.defaultChainId) {
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
    async getEthContractByName(name, chainId = _configs_1.defaultChainId) {
        const contract = await this.getContractByName(name, chainId);
        return this.getEthContract(contract.abi, contract.address);
    }
    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} address - Address of contract in DB
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {Contract}
     */
    async getEthContractByAddress(address, chainId = _configs_1.defaultChainId) {
        const contract = await this.getContractByAddress(address, chainId);
        return this.getEthContract(contract.abi, contract.address);
    }
    /**
     * Ether ERC-721 contract object by token address.
     *
     * @param [address] - Token address
     * @param [chainId] - Chain ID to connect to the correct blockchain network
     */
    async getErc721Contract(address, chainId = _configs_1.defaultChainId) {
        const erc721 = await this.getContractByName('erc721', chainId);
        return this.getEthContract(erc721.abi, address, chainId);
    }
    /**
     * Ether ERC-20 contract object by token address.
     *
     * @param [address] - Token address
     * @param [chainId] - Chain ID to connect to the correct blockchain network
     */
    async getErc20Contract(address, chainId = _configs_1.defaultChainId) {
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
    async getContractByName(name, chainId = _configs_1.defaultChainId) {
        if (this.db) {
            const contract = await this.db.collection('contracts').findOne({ name, chainId });
            return contract;
        }
        return _services_1.requestService.get(`contracts/${name}/name`, { chainId });
    }
    /**
     * DB Contract by address
     *
     * @param {string} address - Address of contract
     * @param {number} chainId - Chain ID to connect to the correct blockchain network
     * @return {ContractDb}
     */
    async getContractByAddress(address, chainId = _configs_1.defaultChainId) {
        if (this.db) {
            const contract = await this.db.collection('contracts').findOne({ address: address.toLowerCase(), chainId });
            return contract;
        }
        return _services_1.requestService.get(`contracts/${address.toLowerCase()}/address`, { chainId });
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
    async exchangeLPTokenToUSD(amountFrom, pair, decimalPlaces = 0, chainId = _configs_1.defaultChainId) {
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
        return pair.totalSupply && (0, _helpers_1.toBN)(pair.totalSupply).isGreaterThan(0)
            ? (0, _helpers_1.toBN)(liquidity.a)
                .plus((0, _helpers_1.toBN)(liquidity.b))
                .multipliedBy((0, _helpers_1.toBN)(amountFrom))
                .div((0, _helpers_1.toBN)(pair.totalSupply))
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
    async exchangeTokenToUSDT(amountFrom, tokenFrom, chainId = _configs_1.defaultChainId, decimalPlaces = 0) {
        const amount = (0, _helpers_1.toBN)(amountFrom);
        const coreTokens = this.getCoreTokens(chainId);
        tokenFrom = tokenFrom.toLowerCase();
        let reserveA;
        let reserveB;
        let coreTokenAmount;
        let coreToken;
        if (Object.values(coreTokens).includes(tokenFrom)) {
            coreToken = tokenFrom;
            coreTokenAmount = amount;
        }
        else {
            const pair = await this.getExchangePair(tokenFrom, chainId);
            if (!pair) {
                return '0';
            }
            coreTokenAmount = await this.getCoreTokenAmount(pair, tokenFrom, amount);
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
        [reserveA, reserveB] = [(0, _helpers_1.toBN)(corePair.reserveA), (0, _helpers_1.toBN)(corePair.reserveB)];
        const usdtAmount = (corePair.tokenA === coreToken)
            ? coreTokenAmount.multipliedBy(reserveB).div(reserveA)
            : coreTokenAmount.multipliedBy(reserveA).div(reserveB);
        return usdtAmount.toFixed(decimalPlaces);
    }
    async getCoreTokenAmount(pair, tokenFrom, amount) {
        if (!pair.isV3) {
            const [reserveA, reserveB] = [(0, _helpers_1.toBN)(pair.reserveA), (0, _helpers_1.toBN)(pair.reserveB)];
            return (pair.tokenA === tokenFrom) ? amount.multipliedBy(reserveB).div(reserveA) : amount.multipliedBy(reserveA).div(reserveB);
        }
        const [tokenA, tokenB] = await this.db.collection('tokens').find({
            address: { $in: [pair.tokenA, pair.tokenB] }
        }).toArray();
        const price = (0, _helpers_1.point2PriceDecimal)(tokenA, tokenB, pair.currentPoint);
        return new bignumber_js_1.default(amount).div(price);
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
    async getCorePair(tokenA, tokenB, chainId = _configs_1.defaultChainId) {
        if (this.db) {
            const corePair = await this.db.collection('pairs').findOne({
                tokenA: tokenA.toLowerCase(),
                tokenB: tokenB.toLowerCase()
                // chainId
            });
            if (corePair) {
                return corePair;
            }
            return null;
        }
        const corePairResponse = await _services_1.requestService.get('pool/core-pair', {
            tokenA,
            tokenB,
            chainId
        });
        return corePairResponse.data;
    }
    async getExchangePair(tokenFrom, chainId = _configs_1.defaultChainId) {
        const coreTokens = Object.values(this.getCoreTokens(chainId));
        const pairV2 = await this.getExchangePairV2(tokenFrom, coreTokens, chainId);
        if (pairV2)
            return pairV2;
        return this.getExchangePairV3(tokenFrom, coreTokens, chainId);
    }
    async getExchangePairV2(tokenFrom, coreTokens, chainId = _configs_1.defaultChainId) {
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
                return pair;
            }
            return null;
        }
        const exchangePair = await _services_1.requestService.post('pool/exchange-pair', {
            tokenFrom,
            coreTokens,
            protocol: 'v2',
            chainId
        });
        return exchangePair.data;
    }
    async getExchangePairV3(tokenFrom, coreTokens, chainId = _configs_1.defaultChainId) {
        let result = null;
        if (this.db) {
            const tokensQuery = {
                // chainId,
                version: 2,
                $or: coreTokens.map(tokenAddress => {
                    const tokens = [tokenFrom.toLowerCase(), tokenAddress.toLowerCase()].sort();
                    return {
                        tokenA: tokens[0],
                        tokenB: tokens[1],
                        swaps: { $gt: 20 }
                    };
                })
            };
            const [pair] = await this.db.collection('pools-v3').find(tokensQuery)
                .sort({ swaps: -1 })
                .limit(1)
                .toArray();
            if (pair) {
                result = pair;
            }
        }
        else {
            const exchangePair = await _services_1.requestService.post('pool/exchange-pair', {
                tokenFrom,
                coreTokens,
                protocol: 'v3',
                chainId
            });
            result = exchangePair.data;
        }
        return result ? Object.assign(result, { isV3: true }) : result;
    }
    async multiCall(ABI, calls, chainId = _configs_1.defaultChainId) {
        const callableAbi = new abi_1.Interface(ABI);
        const callData = calls.map((call) => [
            call.address.toLowerCase(),
            callableAbi.encodeFunctionData(call.name, call.params)
        ]);
        try {
            const multicall = await this.getContractByName('multicall', chainId);
            const multiCallContract = this.getEthContract(multicall['abi'], multicall['address'], chainId);
            const { returnData } = await multiCallContract.methods
                .aggregate(callData)
                .call();
            return returnData.map((call, i) => callableAbi.decodeFunctionResult(calls[i].name, call));
        }
        catch (e) {
            _services_1.logService.error('Cannot execute multi call. ' + e.message);
        }
    }
    /**
     * List of farms addresses
     *
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     * @return {string[]}
     */
    async getFarmsAddresses(chainId = _configs_1.defaultChainId) {
        const farm = await this.getContractByName('farm', chainId);
        const masterChefContract = this.getEthContract(farm.abi, farm.address);
        const poolsCount = await masterChefContract.methods.poolLength().call();
        const calls = [];
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
    async getPairAddress(tokenA, tokenB, chainId = _configs_1.defaultChainId) {
        const web3 = this.getWeb3(chainId);
        const [token0, token1] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
        const abiEncoded1 = web3.eth.abi.encodeParameters(['address', 'address'], [token0, token1])
            .split('0'.repeat(24))
            .join('');
        const salt = web3.utils.soliditySha3(abiEncoded1);
        const factory = await this.getContractByName('factory', chainId);
        const abiEncoded2 = web3.eth.abi.encodeParameters(['address', 'bytes32'], [factory.address, salt])
            .split('0'.repeat(24))
            .join('')
            .substring(2);
        return '0x' + web3_1.default.utils.soliditySha3('0xff' + abiEncoded2, _constants_1.INIT_CODE_HASH).substring(26);
    }
    /**
     * Get pair address by tokens addresses
     *
     * @param {string} pairAddress - Address of pair
     * @param {number} chainId – Chain ID to connect to the correct blockchain network
     *
     * @return {Pair} - Pair
     */
    async getPairByAddress(pairAddress, chainId = _configs_1.defaultChainId) {
        if (!this.db) {
            throw Error(`getPairByAddress:: call 'setDb' is required`);
        }
        const pair = await this.db.collection('pairs').findOne({ pairAddress: pairAddress.toLowerCase() });
        return pair;
    }
    /**
     * List of core tokens
     *
     * @param {number} chainId
     */
    getCoreTokens(chainId = _configs_1.defaultChainId) {
        const coreTokens = {};
        for (const name in tokens) {
            // skip constants without chain id
            if (!tokens[name][chainId])
                continue;
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
    getTokenSymbolByAddress(address, chainId = _configs_1.defaultChainId) {
        for (let key in tokens) {
            if (!tokens[key] || !tokens[key][chainId])
                continue;
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
    getTokenAddressBySymbol(symbol, chainId = _configs_1.defaultChainId) {
        for (let key in tokens) {
            if (!tokens[key] || !tokens[key][chainId])
                continue;
            if (tokens[key][chainId].symbol.toLowerCase() === symbol.toLowerCase()) {
                return tokens[key][chainId].address;
            }
        }
        throw Error(`Cannot find the token address by symbol "${symbol}"`);
    }
    setDb(db) {
        this.db = db;
    }
}
exports.BlockchainService = BlockchainService;
_BlockchainService_dfsFindPaths = new WeakMap(), _BlockchainService_buildGraph = new WeakMap(), _BlockchainService_checkDb = new WeakMap(), _BlockchainService_getCorePairsForTokenV2 = new WeakMap(), _BlockchainService_getCorePairsForTokenV3 = new WeakMap(), _BlockchainService_getCorePairsV3 = new WeakMap(), _BlockchainService_getCorePairsV2 = new WeakMap();
BlockchainService.coreTokens = {
    DAI: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    BSW: '0x965f527d9159dce6288a2219db51fc6eef120dd1',
    BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    USDT: '0x55d398326f99059ff775485246999027b3197955',
    ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
};
exports.blockchainService = new BlockchainService();
