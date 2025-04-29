export function isValidDateFormat(date: string) {
    const regex = /^\d{2}\.\d{4}$/;

    return regex.test(date);
}
