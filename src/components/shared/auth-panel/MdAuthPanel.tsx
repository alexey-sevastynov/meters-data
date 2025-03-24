import Styles from "./authPanel.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logOut } from "@/redux/slices/auth-slice";
import {
    closePopup,
    confirmActionExit,
    confirmActionOnDelete,
    openPopup,
    setIdDelete,
    setQuestion,
} from "@/redux/slices/confirm-popup-slice";
import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { selectTranslations, setLang } from "@/redux/slices/i-18-next";
import { currentLanguage } from "@/components/shared/auth-panel/authPanel.funcs";

export function AuthPanel() {
    const dispatch = useAppDispatch();
    const isExit = useAppSelector((state) => state.confirm.isActionExit);
    const idDeleteItem = useAppSelector((state) => state.confirm.idDeleteItem);
    const lang = useAppSelector((state) => state.i18n.lang);
    const translation = useAppSelector(selectTranslations);
    const [togglePopup, setTogglePopup] = useState(false);
    const authPanelRef = useRef<HTMLDivElement | null>(null);

    const exit = () => {
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
    }, [isExit]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (authPanelRef.current && !authPanelRef.current.contains(event.target as Node)) {
                setTogglePopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [authPanelRef]);

    return (
        <div ref={authPanelRef} className={Styles.authPanel}>
            <h5>{translation.header.mail}</h5>
            <span />
            <div className={Styles.language} onClick={() => setTogglePopup(!togglePopup)}>
                <h5>{currentLanguage(lang)}</h5>
                <RiArrowDownSLine />
            </div>

            <ul className={Styles.popup} style={togglePopup ? { display: "block" } : { display: "none" }}>
                <li
                    onClick={() => {
                        dispatch(setLang("en"));
                        setTogglePopup(false);
                    }}
                >
                    EN
                </li>
                <li
                    onClick={() => {
                        dispatch(setLang("ua"));
                        setTogglePopup(false);
                    }}
                >
                    UA
                </li>
            </ul>

            <span />
            <button type="button" onClick={exit}>
                {translation.header.signOut}
            </button>
        </div>
    );
}
