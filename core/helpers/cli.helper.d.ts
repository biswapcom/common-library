import { CliArgumentValueType } from '../types';
/**
 * Straight-forward node.js argument receiver.
 *
 * @param [name] - Name of node.js argument
 * @param [value] - Default value of argument
 */
export declare const getCliArgument: (name: string, value?: CliArgumentValueType) => any;
