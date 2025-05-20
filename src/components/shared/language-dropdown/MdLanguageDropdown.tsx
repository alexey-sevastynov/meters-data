import Styles from "./languageDropdown.module.scss";
import {
    MdDropdown,
    MdDropdownContent,
    MdDropdownItem,
    MdDropdownTrigger,
} from "@/components/ui/dropdown/MdDropdown";
import { currentLanguage } from "@/components/shared/language-dropdown/languageDropdown.funcs";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { languageKeys } from "@/enums/language-keys";
import { selectTranslations, setLang } from "@/store/slices/i-18-next";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

export function MdLanguageDropdown() {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const lang = useAppSelector((state) => state.i18n.lang);

    const isEnglish = lang === languageKeys.en;
    const isUkraine = lang === languageKeys.ua;
    return (
        <MdDropdown className={Styles.dropdownLanguage}>
            <MdDropdownTrigger className={Styles.dropdownTriggerLanguage}>
                <MdIcon name={iconNames.language} />
                <h5 className={Styles.dropdownTriggerLanguageText}>{currentLanguage(lang)}</h5>
            </MdDropdownTrigger>
            <MdDropdownContent className={Styles.dropdownContentLanguage}>
                <MdDropdownItem
                    onSelect={() => dispatch(setLang(languageKeys.en))}
                    className={Styles.dropdownItemLanguage}
                >
                    <p>{translations.dropdownLanguage.english}</p>
                    {isEnglish && (
                        <MdIcon name={iconNames.check} color={colorNames.grey} size={iconSizes.small} />
                    )}
                </MdDropdownItem>
                <MdDropdownItem
                    onSelect={() => dispatch(setLang(languageKeys.ua))}
                    className={Styles.dropdownItemLanguage}
                >
                    <p>{translations.dropdownLanguage.ukraine}</p>
                    {isUkraine && (
                        <MdIcon name={iconNames.check} color={colorNames.grey} size={iconSizes.small} />
                    )}
                </MdDropdownItem>
            </MdDropdownContent>
        </MdDropdown>
    );
}
