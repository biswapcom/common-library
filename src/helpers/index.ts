import { ChainId } from "@enums";
import { defaultChainId } from "@configs";
import { DEFAULT_REFERRAL_ADDRESS } from "@constants";

export * from './array.helper';
export * from './big-number.helper';
export * from './cli.helper';
export * from './retry.helper';

/**
 * @param {number} ms - Milliseconds
 * @returns {Promise<void>}
 */
export const sleep = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check is this address is default referrer address
 *
 * @param {string} address
 * @param {number} chainId
 * @returns {Promise<boolean>}
 */
export const isDefaultReferrer = (address: string, chainId: ChainId = defaultChainId): boolean => {
    return address.toLowerCase() === DEFAULT_REFERRAL_ADDRESS[chainId].toLowerCase();
}