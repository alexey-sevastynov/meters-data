import { errorMessage } from "../constants/errorMessage";

export function capitalizeFirstLetter(word: string) {
  if (!word || typeof word !== "string") {
    throw new Error(errorMessage.invalidInput.replace("{0}", word));
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}
