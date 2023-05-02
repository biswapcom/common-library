"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountToBN = exports.amountToFixed = exports.weiToNumber = exports.weiToFixed = exports.valueToFixed = exports.zeroBN = exports.oneBN = exports.multiPlus = exports.toBN = void 0;
var bignumber_js_1 = __importDefault(require("bignumber.js"));
bignumber_js_1.default.config({ EXPONENTIAL_AT: 1000000000 });
var toBN = function (value) {
    return new bignumber_js_1.default(value);
};
exports.toBN = toBN;
var multiPlus = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var result = (0, exports.toBN)('0');
    for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
        var value = values_1[_a];
        result = result.plus((0, exports.toBN)(value));
    }
    return result;
};
exports.multiPlus = multiPlus;
/**
 * 10^decimals in BigNumber
 */
var oneBN = function (decimals) {
    if (decimals === void 0) { decimals = 18; }
    return (0, exports.toBN)(10 ^ decimals);
};
exports.oneBN = oneBN;
var zeroBN = function () {
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
var valueToFixed = function (value, decimalPlaces, roundingMode) {
    if (decimalPlaces === void 0) { decimalPlaces = 6; }
    if (typeof value === 'object') {
        return value.div(1e18).toFixed(decimalPlaces, roundingMode);
    }
    return (0, exports.toBN)(value).div(1e18).toFixed(decimalPlaces, roundingMode);
};
exports.valueToFixed = valueToFixed;
// TODO: apply token decimals
var weiToFixed = function (value, decimalPlaces, roundingMode) {
    if (decimalPlaces === void 0) { decimalPlaces = 6; }
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
var weiToNumber = function (value) {
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
var amountToFixed = function (amount, decimals, decimalPlaces) {
    if (decimals === void 0) { decimals = 18; }
    if (decimalPlaces === void 0) { decimalPlaces = 6; }
    return (0, exports.toBN)(amount).div(Math.pow(10, decimals)).toFixed(decimalPlaces);
};
exports.amountToFixed = amountToFixed;
/**
 * Token amount multiple by 1 ** decimals.
 *
 * @param [amount] - Token amount.
 * @param [decimals] - Token decimals.
 */
var amountToBN = function (amount, decimals) {
    if (decimals === void 0) { decimals = 18; }
    if (typeof amount === 'object') {
        return amount.times(Math.pow(10, decimals));
    }
    return (0, exports.toBN)(amount).times(Math.pow(10, decimals));
};
exports.amountToBN = amountToBN;
