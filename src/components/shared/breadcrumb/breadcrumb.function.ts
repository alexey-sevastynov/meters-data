import { appRoutes } from "@/constants/routes";
import { BreadcrumbItem } from "@/components/shared/breadcrumb/breadcrumb.type";

export const isNotLastItem = (index: number, length: number) => {
    return index < length - 1;
};

export const isHomeRoute = (item: BreadcrumbItem) => item.link === appRoutes.home;
