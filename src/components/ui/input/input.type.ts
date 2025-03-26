export const inputTypes = {
    number: "number",
    text: "text",
} as const;

export type InputType = (typeof inputTypes)[keyof typeof inputTypes];
