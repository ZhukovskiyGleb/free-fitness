import {CallbackQuery, Message} from "node-telegram-bot-api";

interface CommonParams {
    userId: number,
    lang: string,
    name?: string,
    nickname?: string
}
export interface Params extends CommonParams {
    chatId: number,
    text?: string,
    data?: string,
}

export class Parser {
    public static parseMessage(msg: Message): Params | undefined {
        const common = this.parseCommon(msg);

        return common ? {
            ...common,
            chatId:     msg.chat.id,
            text:       msg.text,
        } : undefined;
    }

    public static  parseQuery(query: CallbackQuery): Params | undefined {
        const common = this.parseCommon(query);

        return common ? {
            ...common,
            chatId:     query.message ? query.message.chat.id : 0,
            data:       query.data
        } : undefined;
    }

    private static parseCommon(data: Message | CallbackQuery): CommonParams | undefined {
        const userId = data.from ? data.from.id : 0;

        return userId > 0 ? {
            userId:   userId,
            lang:       data.from && data.from.language_code ? data.from.language_code : '',
            name:       (data.from? data.from.first_name : '') + (data.from? data.from.last_name : ''),
            nickname:   data.from? data.from.username : ''
        } : undefined;
    }
}
