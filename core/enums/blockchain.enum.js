"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractType = exports.ChainId = void 0;
var ChainId;
(function (ChainId) {
    ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
    ChainId[ChainId["BSC"] = 56] = "BSC";
    ChainId[ChainId["BSC_TESTNET"] = 97] = "BSC_TESTNET";
    ChainId[ChainId["ETHEREUM"] = 1] = "ETHEREUM";
    ChainId[ChainId["FANTOM"] = 250] = "FANTOM";
    ChainId[ChainId["FANTOM_TESTNET"] = 4002] = "FANTOM_TESTNET";
    ChainId[ChainId["POLYGON"] = 137] = "POLYGON";
    ChainId[ChainId["POLYGON_TESTNET"] = 80001] = "POLYGON_TESTNET";
})(ChainId = exports.ChainId || (exports.ChainId = {}));
var ContractType;
(function (ContractType) {
    ContractType["Default"] = "default";
    ContractType["Single"] = "single";
    ContractType["DoublePool"] = "double-pool";
})(ContractType = exports.ContractType || (exports.ContractType = {}));
