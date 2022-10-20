"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultChainId = exports.web3Config = void 0;
var _enums_1 = require("@enums");
exports.web3Config = (_a = {},
    _a[_enums_1.ChainId.BSC] = {
        httpHosts: [
            'https://bsc-mainnet.nodereal.io/v1/ef269c169b624e28acb38925c0db4e9b'
        ],
    },
    _a);
exports.defaultChainId = _enums_1.ChainId.BSC;
