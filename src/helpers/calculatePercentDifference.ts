export function calculatePercentDifference(newValue: number, oldValue: number) {
  if (oldValue === 0) return 0;

  const MAX_VALUE_PERCENT = 100;
  const difference = newValue - oldValue;
  const percentDifference = (difference / oldValue) * 100;
  const boundedPercentDifference = Math.max(
    -MAX_VALUE_PERCENT,
    Math.min(percentDifference, MAX_VALUE_PERCENT)
  );

  return Number(boundedPercentDifference.toFixed(1));
}
