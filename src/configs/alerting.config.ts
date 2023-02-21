import * as dotenv from 'dotenv';

dotenv.config();

export const alertingConfig = {
    botAuthKey: process.env.TG_AUTH_KEY,
    chatId: process.env.TG_CHAT_ID,
    withoutAlerts: process.env.WITHOUT_ALERTING === 'true'
};