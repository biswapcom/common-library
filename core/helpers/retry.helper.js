"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryHelper = void 0;
const async_retry_1 = __importDefault(require("async-retry"));
const _services_1 = require("../services");
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
function RetryHelper(retries = 5) {
    /**
     * @param fn - function that you want to run with retry
     * @param middlewareFn (optional) - function that will run between retries
     * @param options (optional) - options for retry module (retries, maxTimeout etc.)
     * @return {Promise<unknown>}
     */
    return async function withRetry(fn, middlewareFn = null, options = {}) {
        return (0, async_retry_1.default)(async () => {
            try {
                return await fn();
            }
            catch (err) {
                _services_1.logService.info(`Retry ERROR::${err}`);
                if (middlewareFn instanceof Function)
                    await middlewareFn();
                throw Error(err.toString());
            }
        }, { retries: retries, minTimeout: 100, maxTimeout: 200, ...options });
    };
}
exports.RetryHelper = RetryHelper;
