export * from './big-number.helper';

/**
 * @param {number} ms - Milliseconds
 * @returns {Promise<unknown>}
 */
export const sleep = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));