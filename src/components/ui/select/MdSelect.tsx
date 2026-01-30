import Select, { SingleValue } from "react-select";
import styles from "./select.module.scss";
import { MdCustomOption } from "@/components/ui/select/react-select-components/custom-option/MdCustomOption";
import { MdControl } from "@/components/ui/select/react-select-components/control/MdControl";
import { MdIndicatorsContainer } from "@/components/ui/select/react-select-components/indicators-container/MdIndicatorsContainer";
import { MdMenu } from "@/components/ui/select/react-select-components/menu/MdMenu";
import { Option } from "@/components/ui/select/select-models";
import { VoidFunc } from "@/types/getter-setter-functions";

interface MdSelectProps {
    labelText: string;
    options: Option[];
    value: Option;
    isDisabled?: boolean;
    isLoading?: boolean;
    isSearchable?: boolean;
    onChange?: VoidFunc<Option>;
}

export function MdSelect({
    labelText,
    options,
    value,
    onChange,
    isDisabled = false,
    isLoading = false,
    isSearchable = true,
}: MdSelectProps) {
    return (
        <div className={styles.root}>
            <label>{labelText}:</label>
            <Select<Option, false>
                className={styles.select}
                components={{
                    Control: MdControl,
                    Option: MdCustomOption,
                    IndicatorsContainer: MdIndicatorsContainer,
                    Menu: MdMenu,
                }}
                value={value}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isSearchable={isSearchable}
                options={options}
                onChange={(newValue: SingleValue<Option>) => {
                    if (newValue) onChange?.(newValue);
                }}
            />
        </div>
    );
}
