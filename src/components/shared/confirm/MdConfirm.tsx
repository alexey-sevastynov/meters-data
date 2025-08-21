import { useEffect, useState } from "react";
import styles from "./confirm.module.scss";
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

        dispatch(closePopup());
    };

    useEffect(() => {
        return () => {
            setIsOpen(true);
        };
    }, []);

    return (
        <section className={styles.root}>
            <h2 className={styles.hidden}>confirm</h2>
            <div className={`${styles.confirm} ${isOpen ? styles.active : ""}`}>
                <MdImage className={styles.image} fileName={"cat.png"} alt="cat-eyes" width={300} />
                <button type="button" className={styles.close} onClick={cancel}>
                    <MdIcon name={iconNames.close} size={iconSizes.large} />
                </button>

                <p className={styles.text}>{question}</p>

                <div className={styles.btns}>
                    <MdButton onClick={cancel}>No</MdButton>
                    <MdButton onClick={handleYesClick} color={colorNames.red}>
                        Yes!
                    </MdButton>
                </div>
            </div>
        </section>
    );
}
