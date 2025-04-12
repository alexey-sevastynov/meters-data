export const iconSizes = {
    tiny: 8,
    small: 12,
    medium: 18,
    large: 24,
} as const;

export type SizeIcon = (typeof iconSizes)[keyof typeof iconSizes];

export const iconNames = {
    priceTagFill: "priceTagFill",
    barChartSharp: "barChartSharp",
    longArrowAltDown: "longArrowAltDown",
    longArrowAltUp: "longArrowAltUp",
    edit: "edit",
    plusCircle: "plusCircle",
    triangle: "triangle",
    copy: "copy",
    home: "home",
    circle: "circle",
    calendar: "calendar",
    close: "close",
    caretSquareLeft: "caretSquareLeft",
    caretSquareRight: "caretSquareRight",
    check: "check",
    language: "language",
    arrowDown: "arrowDown",
    arrowUp: "arrowUp",
    expand: "expand",
    lightMode: "lightMode",
    gear: "gear",
    signOut: "signOut",
} as const;

export type IconName = (typeof iconNames)[keyof typeof iconNames];
