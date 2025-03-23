export function calculateWidth(percentDifference: number, isMinus: boolean) {
    if (isMinus) return percentDifference < 0 ? Math.abs(percentDifference) : 0;

    return percentDifference > 0 ? Math.abs(percentDifference) : 0;
}

export function calculateBorderRadius(percentDifference: number, isMinus: boolean) {
    if (Math.abs(percentDifference) <= 95) return "0px";

    return isMinus ? `5px 0 0 5px` : `0 5px 5px 0`;
}
