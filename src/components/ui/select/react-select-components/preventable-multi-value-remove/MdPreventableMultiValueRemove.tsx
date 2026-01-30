import styles from "./preventableMultiValueRemove.module.scss";
import { MultiValueRemoveProps } from "react-select";
import { Option } from "@/components/ui/select/select-models";
import { cn } from "@/lib/cn";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

export function MdPreventableMultiValueRemove(props: MultiValueRemoveProps<Option>) {
    const value = props.selectProps.value as Option[] | undefined;
    const isLastOption = value?.length === 1;

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isLastOption) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            props.innerProps.onClick?.(e);
        }
    };

    return (
        <div
            {...props.innerProps}
            onClick={onClick}
            className={cn(styles.multiValueRemove, isLastOption && styles.disabled)}
        >
            <MdIcon name={iconNames.close} color={colorNames.black} size={iconSizes.small} />
        </div>
    );
}
