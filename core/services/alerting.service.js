"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertingService = void 0;
const _configs_1 = require("../configs");
const log_service_1 = require("./log.service");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
/**
 * @example
 * ```js
 * import {AlertingService} from './'
 * const alerting = new AlertingService();
 * await alerting.sendText('Some title', 'some text')
 * ```
 */
class AlertingService {
    /**
     * @param botAuthKey - your bot auth key
     * @param chatId -  chat id where you want to send a message (your bot must be admin of this chat)
     * @param withoutAlerts - if you don't need alerts (as example - for local development)
     */
    constructor(botAuthKey = _configs_1.alertingConfig.botAuthKey, chatId = _configs_1.alertingConfig.chatId, withoutAlerts = _configs_1.alertingConfig.withoutAlerts) {
        this.withoutAlerts = withoutAlerts;
        if (!botAuthKey)
            throw Error('Alerting service. Required parameter "botAuthKey" is not specified');
        if (!chatId)
            throw Error('Alerting service. Required parameter "chatId" is not specified');
        this.chatId = chatId;
        this.client = new node_telegram_bot_api_1.default(botAuthKey);
    }
    async sendText(title, text) {
        if (this.withoutAlerts)
            return;
        const msg = `\n--------------------\nTitle::\n${title}\n\nMessage::\n${text}`;
        await this.client.sendMessage(this.chatId, msg, { parse_mode: 'HTML' })
            .catch(err => log_service_1.logService.error(`AlertingService::sendText\n${err.toString()}`));
    }
    /**
     * Send message to Telegram chat
     *
     * @param [message]
     * @param [options]
     */
    async sendMessage(message) {
        if (this.withoutAlerts)
            return;
        try {
            await this.client.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
        }
        catch (e) {
            log_service_1.logService.error(`Alerting service cannot send message. ${e.toString()}`);
        }
    }
}
exports.AlertingService = AlertingService;
