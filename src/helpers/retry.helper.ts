import retry from 'async-retry';
import { logService } from '@services';

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

export function RetryHelper(retries: number = 5): Function {
    /**
     * @param fn - function that you want to run with retry
     * @param middlewareFn (optional) - function that will run between retries
     * @param options (optional) - options for retry module (retries, maxTimeout etc.)
     * @return {Promise<unknown>}
     */
    return async function withRetry(fn, middlewareFn: Function | null = null, options = {}) {
        return retry(async () => {
            try {
                return await fn();
            } catch (err) {
                logService.info(`Retry ERROR::${err}`);
                if (middlewareFn instanceof Function) await middlewareFn();
                throw Error(err.toString());
            }
        }, { retries: retries, minTimeout: 100, maxTimeout: 200, ...options });
    };
}