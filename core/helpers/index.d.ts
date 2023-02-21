import { ChainId } from "../enums";
export * from './array.helper';
export * from './big-number.helper';
export * from './cli.helper';
export * from './retry.helper';
/**
 * @param {number} ms - Milliseconds
 * @returns {Promise<void>}
 */
export declare const sleep: (ms?: number) => Promise<unknown>;
/**
 * Check is this address is default referrer address
 *
 * @param {string} address
 * @param {number} chainId
 * @returns {Promise<boolean>}
 */
export declare const isDefaultReferrer: (address: string, chainId?: ChainId) => boolean;
