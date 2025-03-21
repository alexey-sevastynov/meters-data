import { MdButton } from "@/components/ui/button/MdButton";
import Style from "./formActions.module.scss";
import { setNotEdit } from "@/redux/slices/MetersDataSlice";
import { COLORS } from "@/constants";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import { AppDispatch } from "@/redux/store";
import { TranslationKeys } from "@/types/I18nextTypes";

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
          style={{ backgroundColor: COLORS.red }}
          onClick={() => dispatch(setNotEdit())}
        >
          {lang.btn["cancel"]}
        </MdButton>
      )}

      {isEdit ? (
        <MdButton
          type="submit"
          icon={<FaEdit size={SIZE_ICONS.medium} />}
        >
          {lang.btn["edit"]}
        </MdButton>
      ) : (
        <MdButton
          type="submit"
          icon={<FaPlusCircle size={SIZE_ICONS.medium} />}
        >
          {lang.btn["add"]}
        </MdButton>
      )}
    </div>
  );
}
