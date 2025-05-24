import styles from "./inputGroup.module.scss";
import Select, {
    MultiValueRemoveProps,
    ClearIndicatorProps,
    GroupBase,
    MultiValueGenericProps,
    OptionProps,
    ControlProps,
    IndicatorsContainerProps,
    MenuProps,
} from "react-select";
import { Option } from "@/components/ui/input-group/input-group-models";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";

interface MdInputGroupProps {
    options: Option[];
    defaultValue: Option[];
    label?: string;
    onChange?: (selected: Option[]) => void;
}

export function MdInputGroup({ options, defaultValue, label, onChange }: MdInputGroupProps) {
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.inputGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <Select
                key={translations.inputGroup.select}
                components={{
                    Control,
                    ClearIndicator,
                    MultiValueRemove,
                    MultiValueLabel,
                    Option: CustomOption,
                    IndicatorsContainer,
                    Menu,
                }}
                defaultValue={defaultValue}
                closeMenuOnSelect={true}
                className={styles.select}
                options={options}
                isMulti
                onChange={(value) => onChange?.(value as Option[])}
                noOptionsMessage={() => <p>{translations.inputGroup.noOptions}</p>}
                placeholder={translations.inputGroup.select as string}
            />
        </div>
    );
}

function Control(props: ControlProps<Option, true>) {
    return (
        <div
            {...props.innerProps}
            ref={props.innerRef}
            className={cn(styles.control, props.isFocused && styles.focused)}
        >
            {props.children}
        </div>
    );
}

function ClearIndicator(props: ClearIndicatorProps<Option>) {
    return (
        <div {...props.innerProps} className={styles.clearIndicator}>
            <MdIcon name={iconNames.close} color={colorNames.grey} />
        </div>
    );
}

function IndicatorsContainer(props: IndicatorsContainerProps<Option, true, GroupBase<Option>>) {
    const theme = useTheme();

    return (
        <div {...props.innerProps} className={styles.indicatorsContainer}>
            <MdIcon name={iconNames.arrowDown} color={getBaseIconColor(theme.themeMode)} />
        </div>
    );
}

function MultiValueRemove(props: MultiValueRemoveProps<Option>) {
    return (
        <div {...props.innerProps} className={styles.multiValueRemove}>
            <MdIcon name={iconNames.close} color={colorNames.black} size={iconSizes.small} />
        </div>
    );
}

function MultiValueLabel(props: MultiValueGenericProps<Option, true, GroupBase<Option>>) {
    return <div className={styles.multiValueLabel}>{props.data.label}</div>;
}

function CustomOption(props: OptionProps<Option, true>) {
    return (
        <div className={styles.option} ref={props.innerRef} {...props.innerProps}>
            {props.data.label}
        </div>
    );
}

function Menu(props: MenuProps<Option, true>) {
    return (
        <div className={styles.menu} ref={props.innerRef} {...props.innerProps}>
            {props.children}
        </div>
    );
}
