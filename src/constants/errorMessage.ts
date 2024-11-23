export const ERROR_MESSAGE = "Error message:";

export const errorMessage = {
  invalidParameters:
    "Invalid parameters: a = {0} ({1}), b = {2} ({3}). Expected numbers.",
  invalidInput: "Invalid input: expected a non-empty string, but received {0}.",
  invalidDateFormat: "Invalid date format: {0}",
  findEarliestMonthError:
    "Error in calculating the earliest month. Reason: {0}",
  removeFirstAddedMonthError:
    "Error in removeFirstAddedMonth function. Reason: {0}",
} as const;
