import { errorMessage } from "../constants/errorMessage";
import { isNumber } from "./isNumber";

export const calculateSum = (a: number, b: number) => {
  if (!isNumber(a) || !isNumber(b)) {
    throw new Error(
      errorMessage.invalidParameters
        .replace("{0}", a.toString())
        .replace("{1}", typeof a)
        .replace("{2}", b.toString())
        .replace("{3}", typeof b)
    );
  }

  const sum = a + b;
  const formattedSum = sum.toFixed(2);
  const finalResult = parseFloat(formattedSum);

  return finalResult;
};