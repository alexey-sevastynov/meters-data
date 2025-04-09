import { stringToNumber } from "@/utils/conversion";

export function calculatePercentDifference(newValue: number, oldValue: number) {
    if (oldValue === 0) return 0;

    const maxValuePercent = 100;
    const difference = newValue - oldValue;
    const percentDifference = (difference / oldValue) * 100;
    const boundedPercentDifference = Math.max(-maxValuePercent, Math.min(percentDifference, maxValuePercent));

    return stringToNumber(boundedPercentDifference.toFixed(1));
}
