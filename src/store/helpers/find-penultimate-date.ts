export function findPenultimateDate(lastDate: string) {
    const regex = /^(0[1-9]|1[0-2])\.(19|20)\d{2}$/;

    if (!regex.test(lastDate)) {
        throw new Error('Invalid date format. Use the format "MM.YYYY".');
    }

    const [month, year] = lastDate.split(".");
    const numericMonth = parseInt(month, 10);
    const numericYear = parseInt(year, 10);

    if (numericMonth === 1) {
        return `12.${numericYear - 1}`;
    } else {
        const penultimateMonth = (numericMonth - 1).toString().padStart(2, "0");
        return `${penultimateMonth}.${year}`;
    }
}
