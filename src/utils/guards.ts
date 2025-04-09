import { typeNames } from "@/enums/type-names";

export function isObject(value: unknown): value is object {
    return typeof value === typeNames.object && value !== null;
}

export function isString(value: unknown): value is string {
    return typeof value === typeNames.string;
}

export function isNumber(value: unknown): value is number {
    return typeof value === typeNames.number;
}
