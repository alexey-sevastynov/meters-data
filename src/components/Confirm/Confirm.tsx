import React, { useEffect, useState } from "react";
import Styles from "./confirm.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";
import { Button } from "../Button/Button";
import { COLORS } from "../../constants";

import { useAppDispatch } from "../../redux/hook";
import {
  closePopup,
  confirmActionExit,
  confirmActionOnDelete,
  setIdDelete,
} from "../../redux/slices/ConfirmPopupSlice";

interface ConfirmProps {
  question: string;
}

export const Confirm: React.FC<ConfirmProps> = ({ question }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const cancel = () => {
    setIsOpen(false);

    dispatch(confirmActionOnDelete(false));
    dispatch(confirmActionExit(false));
    dispatch(setIdDelete(null));
    dispatch(closePopup());
  };

  const handleYesClick = () => {
    dispatch(confirmActionOnDelete(true));
    dispatch(confirmActionExit(true));

    dispatch(closePopup()); // Close the confirmation popup
  };

  useEffect(() => {
    return () => {
      setIsOpen(true);
    };
  }, []);
  return (
    <section className={Styles.confirmPage}>
      <h2 className={Styles.hidden}>confirm</h2>
      <div className={`${Styles.confirm} ${isOpen ? Styles.active : ""}`}>
        <img
          className={Styles.image}
          src={getIconUrl("cat.png")}
          alt="cat-eyes"
          width={300}
        />
        <button type="button" className={Styles.close} onClick={cancel}>
          <img src={getIconUrl("cross.png")} alt="exit" width={30} />
        </button>

        <p className={Styles.text}>{question}</p>

        <div className={Styles.btns}>
          <Button onClick={cancel}>No</Button>
          <Button
            onClick={handleYesClick}
            style={{ backgroundColor: COLORS.red }}
          >
            Yes!
          </Button>
        </div>
      </div>
    </section>
  );
};
