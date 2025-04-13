import { MdButton } from "@/components/ui/button/MdButton";
import Style from "./formActions.module.scss";
import { setNotEdit } from "@/store/slices/meters-data/slice";
import { AppDispatch } from "@/store/store";
import { TranslationKeys } from "@/types/i-18-next-types";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

interface FormActionsProps {
    isEdit: boolean;
    dispatch: AppDispatch;
    lang: TranslationKeys;
}

export function FormActions({ isEdit, dispatch, lang }: FormActionsProps) {
    return (
        <div className={Style.btns}>
            {isEdit && (
                <MdButton type="button" onClick={() => dispatch(setNotEdit())} color={colorNames.red}>
                    {lang.btn.cancel}
                </MdButton>
            )}

            {isEdit ? (
                <MdButton type="submit" iconName={iconNames.edit}>
                    {lang.btn.save}
                </MdButton>
            ) : (
                <MdButton type="submit" iconName={iconNames.plusCircle}>
                    {lang.btn.save}
                </MdButton>
            )}
        </div>
    );
}
