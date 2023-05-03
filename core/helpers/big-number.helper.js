"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountToBN = exports.amountToFixed = exports.weiToNumber = exports.weiToFixed = exports.valueToFixed = exports.zeroBN = exports.oneBN = exports.multiPlus = exports.toBN = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
bignumber_js_1.default.config({ EXPONENTIAL_AT: 1000000000 });
const toBN = (value) => {
    return new bignumber_js_1.default(value);
};
exports.toBN = toBN;
const multiPlus = (...values) => {
    let result = (0, exports.toBN)('0');
    for (const value of values) {
        result = result.plus((0, exports.toBN)(value));
    }
    return result;
};
exports.multiPlus = multiPlus;
/**
 * 10^decimals in BigNumber
 */
const oneBN = (decimals = 18) => {
    return (0, exports.toBN)(10 ^ decimals);
};
exports.oneBN = oneBN;
const zeroBN = () => {
    return (0, exports.toBN)(0);
};
exports.zeroBN = zeroBN;
/**
 * Representing the value in natural (fixed-point) notation rounded to `decimalPlaces` decimal places and divided by 1e18.
 * TODO: apply token decimals
 *
 * @param {BN|string|number} value
 * @param {number} decimalPlaces
 * @param {BN.RoundingMode} roundingMode
 */
const valueToFixed = (value, decimalPlaces = 6, roundingMode) => {
    if (typeof value === 'object') {
        return value.div(1e18).toFixed(decimalPlaces, roundingMode);
    }
    return (0, exports.toBN)(value).div(1e18).toFixed(decimalPlaces, roundingMode);
};
exports.valueToFixed = valueToFixed;
// TODO: apply token decimals
const weiToFixed = (value, decimalPlaces = 6, roundingMode) => {
    if (typeof value === 'object') {
        return value.div(1e18).toFixed(decimalPlaces, roundingMode);
    }
    return (0, exports.toBN)(value).div(1e18).toFixed(decimalPlaces, roundingMode);
};
exports.weiToFixed = weiToFixed;
/**
 * Representing the Wei in natural number
 * TODO: apply token decimals
 *
 * @param [value]
 */
const weiToNumber = (value) => {
    if (typeof value === 'object') {
        return parseFloat(value.div(1e18).toString());
    }
    return parseFloat((0, exports.toBN)(value).div(1e18).toString());
};
exports.weiToNumber = weiToNumber;
/**
 * @param [amount] - Token amount.
 * @param [decimals] - Token decimals.
 * @param decimalPlaces
 */
const amountToFixed = (amount, decimals = 18, decimalPlaces = 6) => {
    return (0, exports.toBN)(amount).div(10 ** decimals).toFixed(decimalPlaces);
};
exports.amountToFixed = amountToFixed;
/**
 * Token amount multiple by 1 ** decimals.
 *
 * @param [amount] - Token amount.
 * @param [decimals] - Token decimals.
 */
const amountToBN = (amount, decimals = 18) => {
    if (typeof amount === 'object') {
        return amount.times(10 ** decimals);
    }
    return (0, exports.toBN)(amount).times(10 ** decimals);
};
exports.amountToBN = amountToBN;
