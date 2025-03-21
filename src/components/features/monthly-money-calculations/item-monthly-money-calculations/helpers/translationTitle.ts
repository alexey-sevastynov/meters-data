export const translationTitle = (title: string) => {
  switch (title) {
    case "Date":
      return "Дата";
    case "Light day":
      return "Світло день";
    case "Light night":
      return "Світло нічь";
    case "Gas General":
      return "Газ";
    case "Water general":
      return "Вода";
    case "Fixed water":
      return "Фіксована вода";
    case "Delivery Gas":
      return "Доставка газ";
    case "Delivery Water":
      return "Доставка вода";
    case "OSMD":
      return "ОСББ";
    case "Trash":
      return "Сміття";
    case "Intercom":
      return "Домофон";
    case "Heating":
      return "Тепло";
    case "Internet Kyivstar":
      return "Інтернет";
    case "Internet Soyuz T.":
      return "Інтернет";
    case "Internet":
      return "Інтернет";

    default:
      break;
  }
};
