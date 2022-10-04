"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiPlus = exports.toBN = void 0;
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
