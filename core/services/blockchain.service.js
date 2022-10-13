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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockchainService = exports.BlockchainService = void 0;
var abi_1 = require("@ethersproject/abi");
var _helpers_1 = require("../helpers");
var _configs_1 = require("../configs");
var _services_1 = require("./");
var _constants_1 = require("../constants");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var web3_1 = __importDefault(require("web3"));
var tokens = __importStar(require("../constants/tokens"));
bignumber_js_1.default.config({ EXPONENTIAL_AT: 1000000000 });
/**
 * Contains the most frequently used tools for working with contracts, tokens, etc. blockchain
 */
var BlockchainService = /** @class */ (function () {
    function BlockchainService() {
    }
    /**
     * Web3 HTTP-provider
     *
     * @param {ChainId} chainId
     * @return {Web3}
     */
    BlockchainService.prototype.getWeb3 = function (chainId) {
        if (chainId === void 0) { chainId = _configs_1.defaultChainId; }
        if (this.web3) {
            return this.web3;
        }
        var provider = new web3_1.default.providers.HttpProvider(_configs_1.web3Config[chainId].httpHosts[0], { timeout: 6000 });
        return new web3_1.default(provider);
    };
    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {AbiItem[]|string} abi
     * @param {string} address
     * @return {Contract}
     */
    BlockchainService.prototype.getContract = function (abi, address) {
        var web3 = this.getWeb3();
        var jsonInterface = (typeof abi === 'string') ? JSON.parse(abi) : abi;
        return new web3.eth.Contract(jsonInterface, address);
    };
    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} name - Name of contract in DB
     * @return {Contract}
     */
    BlockchainService.prototype.getContractByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _services_1.requestService.get("contracts/".concat(name, "/name"))];
                    case 1:
                        contract = _a.sent();
                        return [2 /*return*/, this.getContract(contract['abi'], contract['address'])];
                }
            });
        });
    };
    /**
     * Contract object that makes easy to interact with smart contracts on the blockchain network
     *
     * @param {string} address - Address of contract in DB
     * @return {Contract}
     */
    BlockchainService.prototype.getContractByAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _services_1.requestService.get("contracts/".concat(address.toLowerCase(), "/address"))];
                    case 1:
                        contract = _a.sent();
                        return [2 /*return*/, this.getContract(contract['abi'], contract['address'])];
                }
            });
        });
    };
    /**
     * Exchange liquidity provider token to USD
     *
     * @param {string} amountFrom
     * @param {Pair} pair
     * @param {number} chainId
     */
    BlockchainService.prototype.exchangeLPTokenToUSD = function (amountFrom, pair, chainId) {
        if (chainId === void 0) { chainId = _configs_1.defaultChainId; }
        return __awaiter(this, void 0, void 0, function () {
            var liquidity;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, this.exchangeTokenToUSDT(pair.reserveA, pair.tokenA, chainId)];
                    case 1:
                        _a.a = _b.sent();
                        return [4 /*yield*/, this.exchangeTokenToUSDT(pair.reserveB, pair.tokenB, chainId)];
                    case 2:
                        liquidity = (_a.b = _b.sent(),
                            _a);
                        if (liquidity.a === '0') {
                            liquidity.a = liquidity.b;
                        }
                        if (liquidity.b === '0') {
                            liquidity.b = liquidity.a;
                        }
                        return [2 /*return*/, pair.totalSupply && (0, _helpers_1.toBN)(pair.totalSupply).isGreaterThan(0)
                                ? (0, _helpers_1.toBN)(liquidity.a)
                                    .plus((0, _helpers_1.toBN)(liquidity.b))
                                    .multipliedBy((0, _helpers_1.toBN)(amountFrom))
                                    .div((0, _helpers_1.toBN)(pair.totalSupply))
                                    .toString(10)
                                : '0'];
                }
            });
        });
    };
    BlockchainService.prototype.exchangeTokenToUSDT = function (amountFrom, tokenFrom, chainId) {
        if (chainId === void 0) { chainId = _configs_1.defaultChainId; }
        return __awaiter(this, void 0, void 0, function () {
            var amount, coreTokens, reserveA, reserveB, coreTokenAmount, coreToken, exchangePair, pair, corePairTokens, corePairResponse, corePair, usdtAmount;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        amount = (0, _helpers_1.toBN)(amountFrom);
                        coreTokens = this.getCoreTokens(chainId);
                        tokenFrom = tokenFrom.toLowerCase();
                        if (!Object.values(coreTokens).includes(tokenFrom)) return [3 /*break*/, 1];
                        coreToken = tokenFrom;
                        coreTokenAmount = amount;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, _services_1.requestService.post('pool/exchange-pair', {
                            tokenFrom: tokenFrom,
                            coreTokens: coreTokens
                        })];
                    case 2:
                        exchangePair = _c.sent();
                        pair = exchangePair.data;
                        if (!pair) {
                            return [2 /*return*/, '0'];
                        }
                        _a = [(0, _helpers_1.toBN)(pair.reserveA), (0, _helpers_1.toBN)(pair.reserveB)], reserveA = _a[0], reserveB = _a[1];
                        coreTokenAmount = (pair.tokenA === tokenFrom) ? amount.multipliedBy(reserveB).div(reserveA) : amount.multipliedBy(reserveA).div(reserveB);
                        coreToken = pair.tokenA === tokenFrom ? pair.tokenB : pair.tokenA;
                        _c.label = 3;
                    case 3:
                        if (coreToken === coreTokens.USDT) {
                            return [2 /*return*/, coreTokenAmount.toString(10)];
                        }
                        corePairTokens = [coreToken, coreTokens.USDT].sort();
                        return [4 /*yield*/, _services_1.requestService.get('pool/core-pair', {
                                tokenA: corePairTokens[0],
                                tokenB: corePairTokens[1],
                            })];
                    case 4:
                        corePairResponse = _c.sent();
                        corePair = corePairResponse.data;
                        if (!corePair) {
                            return [2 /*return*/, '0'];
                        }
                        _b = [(0, _helpers_1.toBN)(corePair.reserveA), (0, _helpers_1.toBN)(corePair.reserveB)], reserveA = _b[0], reserveB = _b[1];
                        usdtAmount = (corePair.tokenA === coreToken)
                            ? coreTokenAmount.multipliedBy(reserveB).div(reserveA)
                            : coreTokenAmount.multipliedBy(reserveA).div(reserveB);
                        return [2 /*return*/, usdtAmount.toString(10)];
                }
            });
        });
    };
    BlockchainService.prototype.multiCall = function (ABI, calls, chainId) {
        if (chainId === void 0) { chainId = _configs_1.defaultChainId; }
        return __awaiter(this, void 0, void 0, function () {
            var callableAbi, callData, multicall, multiCallContract, returnData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callableAbi = new abi_1.Interface(ABI);
                        callData = calls.map(function (call) { return [
                            call.address.toLowerCase(),
                            callableAbi.encodeFunctionData(call.name, call.params),
                        ]; });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, _services_1.requestService.get('contracts/multicall/name')];
                    case 2:
                        multicall = _a.sent();
                        multiCallContract = this.getContract(multicall['abi'], multicall['address']);
                        return [4 /*yield*/, multiCallContract.methods
                                .aggregate(callData)
                                .call()];
                    case 3:
                        returnData = (_a.sent()).returnData;
                        return [2 /*return*/, returnData.map(function (call, i) { return callableAbi.decodeFunctionResult(calls[i].name, call); })];
                    case 4:
                        e_1 = _a.sent();
                        _services_1.logService.error('Cannot execute multi call. ' + e_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * List of launchpool addresses
     */
    BlockchainService.prototype.getPoolAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var farm, masterChefContract, poolsCount, calls, poolIndex, pools;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _services_1.requestService.get('contracts/farm/name')];
                    case 1:
                        farm = _a.sent();
                        masterChefContract = this.getContract(farm['abi'], farm['address']);
                        return [4 /*yield*/, masterChefContract.methods.poolLength().call()];
                    case 2:
                        poolsCount = _a.sent();
                        calls = [];
                        // skip BSW at 0 position
                        for (poolIndex = 1; poolIndex < poolsCount; poolIndex++) {
                            calls.push({
                                address: farm['address'],
                                name: 'poolInfo',
                                params: [poolIndex]
                            });
                        }
                        return [4 /*yield*/, this.multiCall(farm['abi'], calls)];
                    case 3:
                        pools = _a.sent();
                        return [2 /*return*/, pools.filter(function (pool) { return !pool.allocPoint.isZero(); }).map(function (pool) { return pool.lpToken.toLowerCase(); })];
                }
            });
        });
    };
    /**
     * Generate pair address from tokens addresses
     *
     * @param {string} tokenA - Address of token A
     * @param {string} tokenB - Address of token B
     */
    BlockchainService.prototype.getPairAddress = function (tokenA, tokenB) {
        return __awaiter(this, void 0, void 0, function () {
            var web3, _a, token0, token1, abiEncoded1, salt, factory, abiEncoded2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        web3 = this.getWeb3();
                        _a = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA], token0 = _a[0], token1 = _a[1];
                        abiEncoded1 = web3.eth.abi.encodeParameters(['address', 'address'], [token0, token1])
                            .split('0'.repeat(24))
                            .join('');
                        salt = web3.utils.soliditySha3(abiEncoded1);
                        return [4 /*yield*/, _services_1.requestService.get('contracts/factory/name')];
                    case 1:
                        factory = _b.sent();
                        abiEncoded2 = web3.eth.abi.encodeParameters(['address', 'bytes32'], [factory['address'], salt])
                            .split('0'.repeat(24))
                            .join('')
                            .substring(2);
                        return [2 /*return*/, '0x' + web3_1.default.utils.soliditySha3('0xff' + abiEncoded2, _constants_1.INIT_HASH).substring(26)];
                }
            });
        });
    };
    /**
     * List of core tokens
     *
     * @param {number} chainId
     */
    BlockchainService.prototype.getCoreTokens = function (chainId) {
        if (chainId === void 0) { chainId = _configs_1.defaultChainId; }
        var coreTokens = {};
        for (var name in tokens) {
            // skip constants without chain id
            if (!tokens[name][chainId])
                continue;
            var token = tokens[name][chainId];
            if (token.core) {
                coreTokens[token.symbol] = token.address.toLowerCase();
            }
        }
        return coreTokens;
    };
    /**
     * Get symbol of token by address
     *
     * @param {string} address
     * @param {number} chainId
     */
    BlockchainService.prototype.getTokenSymbolByAddress = function (address, chainId) {
        if (chainId === void 0) { chainId = _configs_1.defaultChainId; }
        for (var key in tokens) {
            if (!tokens[key] || !tokens[key][chainId])
                continue;
            if (tokens[key][chainId].address.toLowerCase() === address.toLowerCase()) {
                return tokens[key][chainId].symbol;
            }
        }
        throw Error("Cannot find the token symbol by address \"".concat(address, "\""));
    };
    /**
     * Get address of token by symbol
     *
     * @param {string} symbol
     * @param {number} chainId
     */
    BlockchainService.prototype.getTokenAddressBySymbol = function (symbol, chainId) {
        if (chainId === void 0) { chainId = _configs_1.defaultChainId; }
        for (var key in tokens) {
            if (!tokens[key] || !tokens[key][chainId])
                continue;
            if (tokens[key][chainId].symbol.toLowerCase() === symbol.toLowerCase()) {
                return tokens[key][chainId].address;
            }
        }
        throw Error("Cannot find the token address by symbol \"".concat(symbol, "\""));
    };
    return BlockchainService;
}());
exports.BlockchainService = BlockchainService;
exports.blockchainService = new BlockchainService();
