export const ERROR_MESSAGE = "Error message:";

export const errorMessage = {
    invalidParameters: "Invalid parameters: a = {0} ({1}), b = {2} ({3}). Expected numbers.",
    invalidInput: "Invalid input: expected a non-empty string, but received {0}.",
    invalidDateFormat: "Invalid date format: {0}",
    findEarliestMonthError: "Error in calculating the earliest month. Reason: {0}",
    removeFirstAddedMonthError: "Error in removeFirstAddedMonth function. Reason: {0}",
    unknownFormatType: "Unknown format type: {0}",
    missingEnvVar: "Environment variable {0} is missing or empty.",
    invalidNumber: "The value {0} is not a valid number.",
    invalidNumberString: "The value {0} cannot be converted to a number.",
    mustBeUsedWithinProvider: "{0} must be used within a {1}.",
} as const;
