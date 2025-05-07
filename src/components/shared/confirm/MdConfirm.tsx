import { useEffect, useState } from "react";
import Styles from "./confirm.module.scss";
import { useAppDispatch } from "@/store/hook";
import {
    closePopup,
    confirmActionExit,
    confirmActionOnDelete,
    setIdDelete,
} from "@/store/slices/confirm-popup-slice";
import { MdButton } from "@/components/ui/button/MdButton";
import { colorNames } from "@/enums/color-names";
import { MdImage } from "@/components/ui/image/MdImage";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";

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
                <MdImage className={Styles.image} fileName={"cat.png"} alt="cat-eyes" width={300} />
                <button type="button" className={Styles.close} onClick={cancel}>
                    <MdIcon name={iconNames.close} size={iconSizes.large} />
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
