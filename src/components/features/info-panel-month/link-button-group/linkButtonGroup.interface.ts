import { IconName } from "@/components/ui/icon/icon-constants";

export interface LinkButton {
    path: string;
    iconName: IconName;
    label: string;
}

export interface LinkButtonGroupProps {
    linksGroup: LinkButton[];
    className?: string;
}
