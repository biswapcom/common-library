"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = exports.LogService = void 0;
var moment_1 = __importDefault(require("moment"));
var _enums_1 = require("../enums");
var colors = require('colors');
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
var LogService = /** @class */ (function () {
    function LogService() {
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
    LogService.prototype.info = function (message, options) {
        if (options === void 0) { options = {}; }
        this.log(_enums_1.LogLevel.Info, message, options);
    };
    /**
     * Additional information that should be logged under normal conditions
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    LogService.prototype.notice = function (message, options) {
        if (options === void 0) { options = {}; }
        this.log(_enums_1.LogLevel.Notice, message, options);
    };
    /**
     * Information that should be logged after successful operation
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    LogService.prototype.success = function (message, options) {
        if (options === void 0) { options = {}; }
        this.log(_enums_1.LogLevel.Success, message, options);
    };
    /**
     * This MIGHT be problem, or might not
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    LogService.prototype.warn = function (message, options) {
        if (options === void 0) { options = {}; }
        this.log(_enums_1.LogLevel.Warn, message, options);
    };
    /**
     * Definitely a problem that should be investigated
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    LogService.prototype.error = function (message, options) {
        if (options === void 0) { options = {}; }
        this.log(_enums_1.LogLevel.Error, message, options);
    };
    /**
     * @param {string} message
     * @param {LoggerOptions} options
     */
    LogService.prototype.debug = function (message, options) {
        if (options === void 0) { options = {}; }
        this.log(_enums_1.LogLevel.Debug, message, options);
    };
    /**
     * Output each message from the array in new line
     *
     * @param {Array<string>} messages
     * @param {LoggerOptions} options
     * @param {string} level
     */
    LogService.prototype.list = function (messages, options, level) {
        if (options === void 0) { options = {}; }
        if (level === void 0) { level = _enums_1.LogLevel.Info; }
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            this.log(level, message, options);
        }
    };
    LogService.prototype.log = function (level, message, options) {
        if (options === void 0) { options = {}; }
        var opts = __assign(__assign({}, this.defaultOptions), options);
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
    };
    Object.defineProperty(LogService.prototype, "time", {
        get: function () {
            return colors.datetime("[ ".concat((0, moment_1.default)().format('YYYY.MM.DD HH:mm:ss'), " ]")); // [ 2021.12.13  16:20:25 ]
        },
        enumerable: false,
        configurable: true
    });
    return LogService;
}());
exports.LogService = LogService;
exports.logService = new LogService();
