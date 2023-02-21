/**
 * @example
 * ```js
 * import {AlertingService} from './'
 * const alerting = new AlertingService();
 * await alerting.sendText('Some title', 'some text')
 * ```
 */
export declare class AlertingService {
    private readonly chatId;
    private readonly withoutAlerts;
    private readonly client;
    /**
     * @param botAuthKey - your bot auth key
     * @param chatId -  chat id where you want to send a message (your bot must be admin of this chat)
     * @param withoutAlerts - if you don't need alerts (as example - for local development)
     */
    constructor(botAuthKey?: string, chatId?: string, withoutAlerts?: boolean);
    sendText(title: string, text: string): Promise<void>;
    /**
     * Send message to Telegram chat
     *
     * @param [message]
     * @param [options]
     */
    sendMessage(message: string): Promise<void>;
}
