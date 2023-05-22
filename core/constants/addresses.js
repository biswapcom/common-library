"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TREASURY_ADDRESS = exports.DEFAULT_REFERRAL_ADDRESS = exports.ZERO_ADDRESS = void 0;
const _enums_1 = require("../enums");
exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.DEFAULT_REFERRAL_ADDRESS = {
    [_enums_1.ChainId.BSC]: '0xF5C9DCc09b5241C573A28D0e61cBC393d5c9aCD4'
};
// our wallet
exports.TREASURY_ADDRESS = {
    [_enums_1.ChainId.BSC]: '0x612e072e433A8a08496Ee0714930b357426c12Ce'
};
