import axios from "axios";
import { URL_API_TELEGRAM_SEND_MESSAGE } from "@/constants";
import { isDev } from "@/lib/environments";
import { getStringEnv } from "@/helpers/get-string-env";
import { envKeys } from "@/enums/env-keys";

const parseModes = {
    markdown: "Markdown",
    markdownV2: "MarkdownV2",
    html: "html",
} as const;

type ParseMode = (typeof parseModes)[keyof typeof parseModes];

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

    await axios.post(URL_API_TELEGRAM_SEND_MESSAGE, telegramMessage);
}
