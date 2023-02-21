"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliArgument = void 0;
var args = require('args-parser')(process.argv);
/**
 * Straight-forward node.js argument receiver.
 *
 * @param [name] - Name of node.js argument
 * @param [value] - Default value of argument
 */
var getCliArgument = function (name, value) {
    if (value === void 0) { value = null; }
    return args[name] || value;
};
exports.getCliArgument = getCliArgument;
