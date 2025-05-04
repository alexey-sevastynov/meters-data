import { envKeys } from "@/infra/env/env-keys";
import { getStringEnv } from "@/infra/env/env-functions";

const telegramApiBase = "https://api.telegram.org";
const telegramBotToken = getStringEnv(envKeys.token);
const telegramPaths = {
    bot: `/bot`,
    sendMessage: `/sendMessage`,
} as const;

export const urlApiTelegramSendMessage =
    telegramApiBase + telegramPaths.bot + telegramBotToken + telegramPaths.sendMessage;

export const parseModes = {
    markdown: "Markdown",
    markdownV2: "MarkdownV2",
    html: "html",
} as const;

export type ParseMode = (typeof parseModes)[keyof typeof parseModes];
