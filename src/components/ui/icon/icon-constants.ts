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
} as const;

export type IconName = (typeof iconNames)[keyof typeof iconNames];
