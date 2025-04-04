import { useEffect, useState } from "react";
import Styles from "./confirm.module.scss";
import { useAppDispatch } from "@/store/hook";
import {
    closePopup,
    confirmActionExit,
    confirmActionOnDelete,
    setIdDelete,
} from "@/store/slices/confirm-popup-slice";
import { getIconUrl } from "@/helpers/get-icon-url";
import { MdButton } from "@/components/ui/button/MdButton";
import { colorNames } from "@/enums/color-names";

interface MdConfirmProps {
    question: string;
}

export function MdConfirm({ question }: MdConfirmProps) {
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
                <img className={Styles.image} src={getIconUrl("cat.png")} alt="cat-eyes" width={300} />
                <button type="button" className={Styles.close} onClick={cancel}>
                    <img src={getIconUrl("cross.png")} alt="exit" width={30} />
                </button>

                <p className={Styles.text}>{question}</p>

                <div className={Styles.btns}>
                    <MdButton onClick={cancel}>No</MdButton>
                    <MdButton onClick={handleYesClick} color={colorNames.red}>
                        Yes!
                    </MdButton>
                </div>
            </div>
        </section>
    );
}
