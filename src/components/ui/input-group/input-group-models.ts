import { Props } from "react-select";

export interface Option {
    value: string;
    label: string;
}

export interface CustomSelectProps<TOption> extends Props<TOption, true> {
    preventClearLastOption?: boolean;
}
