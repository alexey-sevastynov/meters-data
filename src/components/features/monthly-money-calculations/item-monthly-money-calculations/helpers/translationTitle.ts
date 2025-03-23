const translations = new Map<string, string>([
    ["Date", "Дата"],
    ["Light day", "Світло день"],
    ["Light night", "Світло ніч"],
    ["Gas General", "Газ"],
    ["Water general", "Вода"],
    ["Fixed water", "Фіксована вода"],
    ["Delivery Gas", "Доставка газ"],
    ["Delivery Water", "Доставка вода"],
    ["OSMD", "ОСББ"],
    ["Trash", "Сміття"],
    ["Intercom", "Домофон"],
    ["Heating", "Тепло"],
    ["Internet Kyivstar", "Інтернет"],
    ["Internet Soyuz T.", "Інтернет"],
    ["Internet", "Інтернет"],
]);

export function translationTitle(title: string) {
    return translations.get(title) ?? title;
}
