import {alertingConfig} from "@configs";
import * as Telegram from 'node-telegram-bot-api'
import {logService} from './log.service'


/** example -
 * const alerting = new AlertingService();
 * await alerting.sendText('Some title', 'some text')
 */

export class AlertingService {

    botAuthKey: string;
    chatId: string;
    withoutAlerts: boolean;

    initPromise: Promise<any>;

    async _getClient(){
        return this.initPromise;
    };

    /**
     *
     * @param botAuthKey - your bot auth key
     * @param chatId -  chat id where you want to send a message (your bot must be admin of this chat)
     * @param withoutAlerts - if you don't need alerts (as example - for local development)
     */
    constructor(botAuthKey: string = alertingConfig.botAuthKey, chatId: string = alertingConfig.chatId, withoutAlerts: boolean = alertingConfig.withoutAlerts) {
        this.botAuthKey = botAuthKey;
        this.chatId = chatId;
        this.withoutAlerts = withoutAlerts;
        if (!this.botAuthKey) throw Error('Alerting::Undefined botAuthKey');
        if (!this.chatId) throw Error('Alerting::Undefined chatId');
        this.initPromise = new Telegram.default(this.botAuthKey);
    }


    async sendText(title: string, text: string) {
        if (this.withoutAlerts) return;
        const client = await this._getClient();
        const msg = `\n--------------------\nTitle::\n${title}\n\nMessage::\n${text}`;
        await client.sendMessage(this.chatId, msg, {parse_mode: 'html'})
            .catch(err=>logService.error(`AlertingService::sendText\n${err.toString()}`));
    }



}