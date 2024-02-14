import axios from "axios";
import { URL_API_TELEGRAM_SEND_MESSAGE } from "../constants";

interface TelegramMessage {
  chat_id: string;
  parse_mode: string;
  text: string;
}

export async function sendMessageToTelegram(
  chatId: string,
  message: string
): Promise<void> {
  const telegramMessage: TelegramMessage = {
    chat_id: chatId,
    parse_mode: "html",
    text: message,
  };

  try {
    await axios.post(URL_API_TELEGRAM_SEND_MESSAGE, telegramMessage);
  } catch (error) {
    console.error("Error when sending a message in Telegram:", error);
  }
}
