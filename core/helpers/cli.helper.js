"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCliArgument = void 0;
const args = require('args-parser')(process.argv);
/**
 * Straight-forward node.js argument receiver.
 *
 * @param [name] - Name of node.js argument
 * @param [value] - Default value of argument
 */
const getCliArgument = (name, value = null) => {
    return args[name] || value;
};
exports.getCliArgument = getCliArgument;
