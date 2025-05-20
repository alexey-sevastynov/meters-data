import { InputType, inputTypes } from "@/components/ui/input/input.type";

const defaultNumberInputStep = 0.1;
const defaultNumberInputMin = 0;

export function getNumberInputProps(type: InputType, step = defaultNumberInputStep) {
    if (type === inputTypes.number) return { step, min: defaultNumberInputMin };
}
