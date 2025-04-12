export const dropdownPosition = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
} as const;

export type DropdownPosition = (typeof dropdownPosition)[keyof typeof dropdownPosition];
