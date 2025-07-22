import styles from "./inputGroup.module.scss";
import Select, { MultiValueRemoveProps, MultiValue } from "react-select";
import { Option } from "@/components/ui/input-group/input-group-models";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { VoidFunc } from "@/types/getter-setter-functions";
import { MdControl } from "@/components/ui/input-group/control/MdControl";
import { MdClearIndicator } from "@/components/ui/input-group/clear-indicator/MdClearIndicator";
import { isTryingToRemoveLastOption } from "@/components/ui/input-group/inputGroup.funcs";
import { MdPreventableMultiValueRemove } from "@/components/ui/input-group/preventable-multi-value-remove/MdPreventableMultiValueRemove";
import { MdMenu } from "@/components/ui/input-group/menu/MdMenu";
import { MdIndicatorsContainer } from "@/components/ui/input-group/indicators-container/MdIndicatorsContainer";
import { MdMultiValueRemove } from "@/components/ui/input-group/multi-value-remove/MdMultiValueRemove";
import { MdMultiValueLabel } from "@/components/ui/input-group/multi-value-label/MultiValueLabel";
import { MdCustomOption } from "@/components/ui/input-group/custom-option/MdCustomOption";

interface MdInputGroupProps {
    options: Option[];
    defaultValue: Option[];
    label?: string;
    onChange?: VoidFunc<Option[]>;
    preventClearLastOption?: boolean;
}

export function MdInputGroup({
    options,
    defaultValue,
    label,
    onChange,
    preventClearLastOption = false,
}: MdInputGroupProps) {
    const translations = useAppSelector(selectTranslations);

    const onInputGroupChange = (newValue: MultiValue<Option>) => {
        if (isTryingToRemoveLastOption(newValue, preventClearLastOption)) return;

        onChange?.([...newValue]);
    };

    return (
        <div className={styles.inputGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <Select
                key={translations.inputGroup.select}
                components={{
                    Control: MdControl,
                    ClearIndicator: MdClearIndicator,
                    MultiValueRemove: getMultiValueRemoveComponent(preventClearLastOption),
                    MultiValueLabel: MdMultiValueLabel,
                    Option: MdCustomOption,
                    IndicatorsContainer: MdIndicatorsContainer,
                    Menu: MdMenu,
                }}
                defaultValue={defaultValue}
                closeMenuOnSelect={true}
                className={styles.select}
                options={options}
                isMulti
                onChange={onInputGroupChange}
                noOptionsMessage={() => <p>{translations.inputGroup.noOptions}</p>}
                placeholder={translations.inputGroup.select}
            />
        </div>
    );
}

function getMultiValueRemoveComponent(preventClearLastOption: boolean) {
    return preventClearLastOption
        ? (props: MultiValueRemoveProps<Option>) => <MdPreventableMultiValueRemove {...props} />
        : MdMultiValueRemove;
}
