import { alertingConfig } from '@configs';
import { logService } from '@services/log.service';
import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';

/**
 * @example
 * ```js
 * import {AlertingService} from '@services'
 * const alerting = new AlertingService();
 * await alerting.sendText('Some title', 'some text')
 * ```
 */
export class AlertingService {

    private readonly chatId: string;
    private readonly withoutAlerts: boolean;
    private readonly client: TelegramBot;


    /**
     * @param botAuthKey - your bot auth key
     * @param chatId -  chat id where you want to send a message (your bot must be admin of this chat)
     * @param withoutAlerts - if you don't need alerts (as example - for local development)
     */
    constructor(botAuthKey: string = alertingConfig.botAuthKey, chatId: string = alertingConfig.chatId, withoutAlerts: boolean = alertingConfig.withoutAlerts) {
        this.withoutAlerts = withoutAlerts;

        if (!botAuthKey) throw Error('Alerting service. Required parameter "botAuthKey" is not specified');
        if (!chatId) throw Error('Alerting service. Required parameter "chatId" is not specified');

        this.chatId = chatId;
        this.client = new TelegramBot(botAuthKey);
    }

    async sendText(title: string, text: string) {
        if (this.withoutAlerts) return;

        const msg = `\n--------------------\nTitle::\n${title}\n\nMessage::\n${text}`;
        await this.client.sendMessage(this.chatId, msg, { parse_mode: 'HTML' })
            .catch(err => logService.error(`AlertingService::sendText\n${err.toString()}`));
    }

    /**
     * Send message to Telegram chat
     *
     * @param [message]
     * @param [options]
     */
    async sendMessage(message: string) {
        if (this.withoutAlerts) return;

        try {
           await this.client.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
        } catch (e) {
            logService.error(`Alerting service cannot send message. ${e.toString()}`);
        }
    }
}
