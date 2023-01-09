/**
 * @example
 * ```js
 * import {RetryHelper} from './'
 * const wihRetry = new RetryHelper(10);
 * const result = await wihRetry(()=>someAsyncFunction()).catch(err=>handleFinalCatch(err));
 * ```
 * @param retries - count of retries
 * @constructor
 */
export declare function RetryHelper(retries?: number): Function;
