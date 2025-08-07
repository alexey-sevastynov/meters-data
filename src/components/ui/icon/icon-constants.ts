export const iconSizes = {
    tiny: 8,
    small: 12,
    medium: 18,
    large: 24,
} as const;

export type IconSize = (typeof iconSizes)[keyof typeof iconSizes];

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
    arrowRight: "arrowRight",
    expand: "expand",
    lightMode: "lightMode",
    gear: "gear",
    signOut: "signOut",
    plus: "plus",
    view: "view",
    delete: "delete",
    sort: "sort",
    refresh: "refresh",
    water: "water",
    gas: "gas",
    light: "light",
} as const;

export type IconName = (typeof iconNames)[keyof typeof iconNames];
