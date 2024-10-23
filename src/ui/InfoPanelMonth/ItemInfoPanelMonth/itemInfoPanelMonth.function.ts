import { VALUE_BY_TITLE } from "@/constants";
import { Lang } from "@/redux/slices/I18next";

export const showValue = (title: string, lang: Lang) => {
  const unitOfChange = VALUE_BY_TITLE[title];
  return lang.value[unitOfChange] || "";
};

export const shouldRenderDescriptionTitle = (
  isMobileView: boolean,
  title: string
) => {
  return isMobileView ? title !== "Date" : true;
};
