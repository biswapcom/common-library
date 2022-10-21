import moment from "moment";
import { LogLevel } from "@enums";
import { LoggerOptions } from "@types";

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
    unknown: [ 'black', 'bgWhite' ]
});

export class LogService {
    private readonly defaultOptions: LoggerOptions = {
        newline: 0,
        break: 0,
        bold: false,
        underline: false
    };

    /**
     * Important information that should be logged under normal conditions
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    info(message: string, options: LoggerOptions = {}) {
        this.log(LogLevel.Info, message, options);
    }

    /**
     * Additional information that should be logged under normal conditions
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    notice(message: string, options: LoggerOptions = {}): void {
        this.log(LogLevel.Notice, message, options);
    }

    /**
     * Information that should be logged after successful operation
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    success(message: any, options: LoggerOptions = {}) {
        this.log(LogLevel.Success, message, options);
    }

    /**
     * This MIGHT be problem, or might not
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    warn(message: string, options: LoggerOptions = {}) {
        this.log(LogLevel.Warn, message, options);
    }

    /**
     * Definitely a problem that should be investigated
     *
     * @param {string} message
     * @param {LoggerOptions} options
     */
    error(message: string, options: LoggerOptions = {}) {
        this.log(LogLevel.Error, message, options);
    }

    /**
     * @param {string} message
     * @param {LoggerOptions} options
     */
    debug(message: any, options: LoggerOptions = {}) {
        this.log(LogLevel.Debug, message, options);
    }

    /**
     * Output each message from the array in new line
     *
     * @param {Array<string>} messages
     * @param {LoggerOptions} options
     * @param {string} level
     */
    list(messages: any[], options: LoggerOptions = {}, level: LogLevel = LogLevel.Info) {
        for (const message of messages) {
            this.log(level, message, options);
        }
    }

    private log(level: string, message: any, options: LoggerOptions = {}) {
        const opts = { ...this.defaultOptions, ...options };

        switch (level.toLowerCase()) {
            case LogLevel.Notice:
                message = colors.notice(message);

                break;
            case LogLevel.Info:
                message = colors.info(message);

                break;

            case LogLevel.Success:
                message = colors.success(message);

                break;
            case LogLevel.Warn:
                message = colors.warn(message);

                break;
            case LogLevel.Error:
                message = colors.error(message);

                break;
            case LogLevel.Debug:
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

    private get time(): string {
        return colors.datetime(`[ ${moment().format('YYYY.MM.DD HH:mm:ss')} ]`); // [ 2021.12.13  16:20:25 ]
    }
}

export const logService = new LogService();