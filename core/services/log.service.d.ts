import { LogLevel } from "../enums";
import { LoggerOptions } from "../types";
export declare class LogService {
    private readonly defaultOptions;
    /**
     * Important information that should be logged under normal conditions
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    info(message: string, options?: LoggerOptions): void;
    /**
     * Additional information that should be logged under normal conditions
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    notice(message: string, options?: LoggerOptions): void;
    /**
     * Information that should be logged after successful operation
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    success(message: any, options?: LoggerOptions): void;
    /**
     * This MIGHT be problem, or might not
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    warn(message: string, options?: LoggerOptions): void;
    /**
     * Definitely a problem that should be investigated
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    error(message: string, options?: LoggerOptions): void;
    /**
     * @param {string} message
     * @param {LoggerOptions} options
     */
    debug(message: any, options?: LoggerOptions): void;
    /**
     * Output each message from the array in new line
     *
     * @param {Array<string>} messages
     * @param {LoggerOptions} options
     * @param {string} level
     */
    list(messages: any[], options?: LoggerOptions, level?: LogLevel): void;
    private log;
    private get time();
}
export declare const logService: LogService;
