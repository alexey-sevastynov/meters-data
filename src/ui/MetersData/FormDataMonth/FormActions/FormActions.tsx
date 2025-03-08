import { Button } from "@/ui/Button/Button";
import Style from "@/ui/MetersData/FormDataMonth/FormActions/formActions.module.scss";
import { setNotEdit } from "@/redux/slices/MetersDataSlice";
import { COLORS } from "@/constants";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import { AppDispatch } from "@/redux/store";

interface FormActionsProps {
  isEdit: boolean;
  dispatch: AppDispatch;
  lang: any;
}

export function FormActions({ isEdit, dispatch, lang }: FormActionsProps) {
  return (
    <div className={Style.btns}>
      {isEdit && (
        <Button
          type="button"
          style={{ backgroundColor: COLORS.red }}
          onClick={() => dispatch(setNotEdit())}
        >
          {lang.btn["cancel"]}
        </Button>
      )}

      {isEdit ? (
        <Button
          type="submit"
          icon={<FaEdit size={SIZE_ICONS.medium} />}
        >
          {lang.btn["edit"]}
        </Button>
      ) : (
        <Button
          type="submit"
          icon={<FaPlusCircle size={SIZE_ICONS.medium} />}
        >
          {lang.btn["add"]}
        </Button>
      )}
    </div>
  );
}
