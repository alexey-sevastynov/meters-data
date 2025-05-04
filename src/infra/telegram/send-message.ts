import axios from "axios";
import { isDev } from "@/lib/environments";
import { getStringEnv } from "@/infra/env/env-functions";
import { envKeys } from "@/infra/env/env-keys";
import { ParseMode, parseModes, urlApiTelegramSendMessage } from "@/infra/telegram/constants";

interface TelegramMessage {
    chat_id: string;
    parse_mode: string;
    text: string;
}

export async function sendMessageToTelegram(message: string, parseMode: ParseMode = parseModes.html) {
    if (isDev()) return;

    const telegramMessage: TelegramMessage = {
        chat_id: getStringEnv(envKeys.chatId),
        parse_mode: parseMode,
        text: message,
    };

    await axios.post(urlApiTelegramSendMessage, telegramMessage);
}
