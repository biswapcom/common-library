import { CliArgumentValueType } from '@types';

const args = require('args-parser')(process.argv);

/**
 * Straight-forward node.js argument receiver.
 *
 * @param [name] - Name of node.js argument
 * @param [value] - Default value of argument
 */
export const getCliArgument = (name: string, value: CliArgumentValueType = null) => {
    return args[name] || value;
};
