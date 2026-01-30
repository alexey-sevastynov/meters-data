import styles from "./inputGroup.module.scss";
import Select, { MultiValueRemoveProps, MultiValue } from "react-select";
import { Option } from "@/components/ui/select/select-models";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { VoidFunc } from "@/types/getter-setter-functions";
import { MdControl } from "@/components/ui/select/react-select-components/control/MdControl";
import { MdClearIndicator } from "@/components/ui/select/react-select-components/clear-indicator/MdClearIndicator";
import { isTryingToRemoveLastOption } from "@/components/ui/select/input-group/inputGroup.funcs";
import { MdPreventableMultiValueRemove } from "@/components/ui/select/react-select-components/preventable-multi-value-remove/MdPreventableMultiValueRemove";
import { MdMenu } from "@/components/ui/select/react-select-components/menu/MdMenu";
import { MdIndicatorsContainer } from "@/components/ui/select/react-select-components/indicators-container/MdIndicatorsContainer";
import { MdMultiValueRemove } from "@/components/ui/select/react-select-components/multi-value-remove/MdMultiValueRemove";
import { MdMultiValueLabel } from "@/components/ui/select/react-select-components/multi-value-label/MultiValueLabel";
import { MdCustomOption } from "@/components/ui/select/react-select-components/custom-option/MdCustomOption";

interface MdInputGroupProps {
    options: Option[];
    defaultValue: Option[];
    label?: string;
    onChange?: VoidFunc<Option[]>;
    preventClearLastOption?: boolean;
    value?: Option[];
}

export function MdInputGroup({
    options,
    defaultValue,
    label,
    onChange,
    preventClearLastOption = false,
    value,
}: MdInputGroupProps) {
    const translations = useAppSelector(selectTranslations);

    const onInputGroupChange = (newValue: MultiValue<Option>) => {
        if (isTryingToRemoveLastOption(newValue, preventClearLastOption)) return;

        onChange?.([...newValue]);
    };

    return (
        <div className={styles.inputGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <Select<Option, true>
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
                value={value}
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
