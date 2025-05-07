import { useCallback, useEffect } from "react";
import Styles from "./dropdownMenu.module.scss";
import {
    MdDropdown,
    MdDropdownContent,
    MdDropdownItem,
    MdDropdownTrigger,
} from "@/components/ui/dropdown/MdDropdown";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logOut } from "@/store/slices/auth-slice";
import { closePopup, confirmActionExit, confirmActionOnDelete } from "@/store/slices/confirm-popup-slice";
import { exitAccount } from "./dropdownMenu.funcs";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdImage } from "@/components/ui/image/MdImage";

export function MdDropdownMenu() {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const isExit = useAppSelector((state) => state.confirm.isActionExit);
    const idDeleteItem = useAppSelector((state) => state.confirm.idDeleteItem);

    const onExitAccount = useCallback(() => {
        exitAccount(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if (isExit && idDeleteItem === null) {
            dispatch(logOut());
            dispatch(closePopup());
            dispatch(confirmActionOnDelete(false));
            dispatch(confirmActionExit(false));
        }
    }, [isExit, idDeleteItem, dispatch]);

    return (
        <MdDropdown className={Styles.dropdownMenu}>
            <MdDropdownTrigger className={Styles.dropdownTriggerMenu}>
                <MdImage fileName={"avatar.svg"} alt="avatar" width={30} height={30} />
                <h5>Lesha Sev</h5>
            </MdDropdownTrigger>
            <MdDropdownContent className={Styles.dropdownContentMenu}>
                <MdDropdownItem className={Styles.dropdownItemMenu} disabled>
                    <div className={Styles.dropdownItemMenuInner}>
                        <MdIcon name={iconNames.lightMode} color={colorNames.grey} size={iconSizes.small} />
                        <p>{translations.dropdownMenu.lightMode}</p>
                    </div>
                    <MdIcon name={iconNames.expand} color={colorNames.grey} size={iconSizes.small} />
                </MdDropdownItem>
                <MdDropdownItem className={Styles.dropdownItemMenu} disabled>
                    <div className={Styles.dropdownItemMenuInner}>
                        <MdIcon name={iconNames.gear} color={colorNames.grey} size={iconSizes.small} />
                        <p>{translations.dropdownMenu.settings}</p>
                    </div>
                </MdDropdownItem>
                <MdDropdownItem className={Styles.dropdownItemMenu} onSelect={onExitAccount}>
                    <div className={Styles.dropdownItemMenuInner}>
                        <MdIcon name={iconNames.signOut} color={colorNames.grey} size={iconSizes.small} />
                        <p>{translations.dropdownMenu.signOut}</p>
                    </div>
                </MdDropdownItem>
            </MdDropdownContent>
        </MdDropdown>
    );
}
