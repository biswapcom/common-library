"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = exports.LogService = void 0;
const moment_1 = __importDefault(require("moment"));
const _enums_1 = require("../enums");
const colors = require('colors');
colors.setTheme({
    notice: 'gray',
    info: 'white',
    success: 'green',
    warn: 'yellow',
    error: 'red',
    debug: 'yellow',
    help: 'cyan',
    verbose: 'cyan',
    datetime: 'blue',
    unknown: ['black', 'bgWhite']
});
class LogService {
    constructor() {
        this.defaultOptions = {
            newline: 0,
            break: 0,
            bold: false,
            underline: false
        };
    }
    /**
     * Important information that should be logged under normal conditions
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    info(message, options = {}) {
        this.log(_enums_1.LogLevel.Info, message, options);
    }
    /**
     * Additional information that should be logged under normal conditions
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    notice(message, options = {}) {
        this.log(_enums_1.LogLevel.Notice, message, options);
    }
    /**
     * Information that should be logged after successful operation
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    success(message, options = {}) {
        this.log(_enums_1.LogLevel.Success, message, options);
    }
    /**
     * This MIGHT be problem, or might not
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    warn(message, options = {}) {
        this.log(_enums_1.LogLevel.Warn, message, options);
    }
    /**
     * Definitely a problem that should be investigated
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    error(message, options = {}) {
        this.log(_enums_1.LogLevel.Error, message, options);
    }
    /**
     * @param {string} message
     * @param {LoggerOptions} options
     */
    debug(message, options = {}) {
        this.log(_enums_1.LogLevel.Debug, message, options);
    }
    /**
     * Output each message from the array in new line
     *
     * @param {Array<string>} messages
     * @param {LoggerOptions} options
     * @param {string} level
     */
    list(messages, options = {}, level = _enums_1.LogLevel.Info) {
        for (const message of messages) {
            this.log(level, message, options);
        }
    }
    log(level, message, options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        switch (level.toLowerCase()) {
            case _enums_1.LogLevel.Notice:
                message = colors.notice(message);
                break;
            case _enums_1.LogLevel.Info:
                message = colors.info(message);
                break;
            case _enums_1.LogLevel.Success:
                message = colors.success(message);
                break;
            case _enums_1.LogLevel.Warn:
                message = colors.warn(message);
                break;
            case _enums_1.LogLevel.Error:
                message = colors.error(message);
                break;
            case _enums_1.LogLevel.Debug:
                message = colors.debug('🪲 ' + message);
                break;
            default:
                message = colors.unknown(message);
        }
        if (opts.bold) {
            message = colors.bold(message);
        }
        if (opts.underline) {
            message = colors.underline(message);
        }
        if (opts.newline > 0) {
            console.log('\n'.repeat(opts.newline - 1));
        }
        // output message
        console.log(this.time, message);
        if (opts.break > 0) {
            console.log('\n'.repeat(opts.break - 1));
        }
    }
    get time() {
        return colors.datetime(`[ ${(0, moment_1.default)().format('YYYY.MM.DD HH:mm:ss')} ]`); // [ 2021.12.13  16:20:25 ]
    }
}
exports.LogService = LogService;
exports.logService = new LogService();
