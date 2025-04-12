import { useEffect, useRef } from "react";
import Styles from "./authPanel.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logOut } from "@/store/slices/auth-slice";
import {
    closePopup,
    confirmActionExit,
    confirmActionOnDelete,
    openPopup,
    setIdDelete,
    setQuestion,
} from "@/store/slices/confirm-popup-slice";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdLanguageDropdown } from "@/components/shared/language-dropdown/MdLanguageDropdown";

export function AuthPanel() {
    const dispatch = useAppDispatch();
    const isExit = useAppSelector((state) => state.confirm.isActionExit);
    const idDeleteItem = useAppSelector((state) => state.confirm.idDeleteItem);
    const translation = useAppSelector(selectTranslations);
    const authPanelRef = useRef<HTMLDivElement | null>(null);

    const exitAccount = () => {
        dispatch(openPopup());
        dispatch(setQuestion("Do you really want to exit?"));
        dispatch(setIdDelete(null));
    };

    useEffect(() => {
        if (isExit && idDeleteItem === null) {
            dispatch(logOut());
            dispatch(closePopup());
            dispatch(confirmActionOnDelete(false));
            dispatch(confirmActionExit(false));
        }
    }, [isExit, idDeleteItem, dispatch]);

    return (
        <div ref={authPanelRef} className={Styles.authPanel}>
            <MdLanguageDropdown />

            <button type="button" onClick={exitAccount} className={Styles.signOutButton}>
                {translation.header.signOut}
            </button>
        </div>
    );
}
