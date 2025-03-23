export interface LinkButton {
    path: string;
    icon: React.ReactNode;
    label: string;
}

export interface LinkButtonGroupProps {
    linksGroup: LinkButton[];
    className?: string;
}
