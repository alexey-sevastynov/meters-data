import { ROUTES } from "@/constants/routes";
import { BreadcrumbItem } from "./breadcrumb.type";

export const isNotLastItem = (index: number, length: number) => {
  return index < length - 1;
};

export const isHomeRoute = (item: BreadcrumbItem) => item.link === ROUTES.HOME;
