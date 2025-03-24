import { MdButton } from "@/components/ui/button/MdButton";
import Style from "./formActions.module.scss";
import { setNotEdit } from "@/redux/slices/meters-data-slice";
import { colors } from "@/constants/colors";
import { AppDispatch } from "@/redux/store";
import { TranslationKeys } from "@/types/i-18-next-types";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";

interface FormActionsProps {
    isEdit: boolean;
    dispatch: AppDispatch;
    lang: TranslationKeys;
}

export function FormActions({ isEdit, dispatch, lang }: FormActionsProps) {
    return (
        <div className={Style.btns}>
            {isEdit && (
                <MdButton
                    type="button"
                    style={{ backgroundColor: colors.red }}
                    onClick={() => dispatch(setNotEdit())}
                >
                    {lang.btn["cancel"]}
                </MdButton>
            )}

            {isEdit ? (
                <MdButton type="submit" icon={<MdIcon name={iconNames.edit} />}>
                    {lang.btn["edit"]}
                </MdButton>
            ) : (
                <MdButton type="submit" icon={<MdIcon name={iconNames.plusCircle} />}>
                    {lang.btn["add"]}
                </MdButton>
            )}
        </div>
    );
}
