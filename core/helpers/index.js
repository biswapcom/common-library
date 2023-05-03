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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefaultReferrer = exports.sleep = void 0;
const _configs_1 = require("../configs");
const _constants_1 = require("../constants");
__exportStar(require("./array.helper"), exports);
__exportStar(require("./big-number.helper"), exports);
__exportStar(require("./cli.helper"), exports);
__exportStar(require("./retry.helper"), exports);
__exportStar(require("./time.helper"), exports);
__exportStar(require("./v3.helper"), exports);
/**
 * @param {number} ms - Milliseconds
 * @returns {Promise<void>}
 */
const sleep = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
exports.sleep = sleep;
/**
 * Check is this address is default referrer address
 *
 * @param {string} address
 * @param {number} chainId
 * @returns {Promise<boolean>}
 */
const isDefaultReferrer = (address, chainId = _configs_1.defaultChainId) => {
    return address.toLowerCase() === _constants_1.DEFAULT_REFERRAL_ADDRESS[chainId].toLowerCase();
};
exports.isDefaultReferrer = isDefaultReferrer;
