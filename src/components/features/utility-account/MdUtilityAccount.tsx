import { useAppSelector } from "@/store/hook";
import Styles from "./utilityAccount.module.scss";
import { useLocation } from "react-router-dom";
import { BillingAccount } from "@/store/models/billing-account";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

// TODO: template component UtilityAccount
export function MdUtilityAccount() {
    const lang = useAppSelector(selectTranslations);

    const { pathname } = useLocation();
    const currentAddressName: string = pathname.slice(1).replace("/price", "");

    const items = useAppSelector((state) => state.addressData.items);

    const item: BillingAccount | undefined = items.find((i) => i.address.includes(currentAddressName));

    return (
        <div className={Styles.utilityAccount}>
            <h2 className={Styles.utilityAccount__title}>{lang.utilityAccount.title}</h2>

            {/* todo: add items & item component later */}
            <div className={Styles.utilityAccount__items}>
                {item?.light && (
                    <div className={Styles.utilityAccount__items_item}>
                        <p>{lang.utilityAccount.light}:</p>
                        <div className={Styles.utilityAccount__items_item_content}>
                            <p className={Styles.utilityAccount__items_item_content_value}>{item?.light}</p>
                            <button
                                title={lang.utilityAccount.copy}
                                className={Styles.utilityAccount__items_item_content_copy}
                                onClick={() => navigator.clipboard.writeText(item?.light)}
                            >
                                <MdIcon
                                    name={iconNames.copy}
                                    size={iconSizes.small}
                                    color={colorNames.black}
                                />
                            </button>
                        </div>
                    </div>
                )}

                {item?.water && (
                    <div className={Styles.utilityAccount__items_item}>
                        <p>{lang.utilityAccount.water}:</p>
                        <div className={Styles.utilityAccount__items_item_content}>
                            <p className={Styles.utilityAccount__items_item_content_value}>{item?.water}</p>
                            <button
                                title={lang.utilityAccount.copy}
                                className={Styles.utilityAccount__items_item_content_copy}
                                onClick={() => navigator.clipboard.writeText(item?.water)}
                            >
                                <MdIcon
                                    name={iconNames.copy}
                                    size={iconSizes.small}
                                    color={colorNames.black}
                                />
                            </button>
                        </div>
                    </div>
                )}

                {item?.gas && (
                    <div className={Styles.utilityAccount__items_item}>
                        <p>{lang.utilityAccount.gas}:</p>
                        <div className={Styles.utilityAccount__items_item_content}>
                            <p className={Styles.utilityAccount__items_item_content_value}>{item?.gas}</p>
                            <button
                                title={lang.utilityAccount.copy}
                                className={Styles.utilityAccount__items_item_content_copy}
                                onClick={() => navigator.clipboard.writeText(item?.gas)}
                            >
                                <MdIcon
                                    name={iconNames.copy}
                                    size={iconSizes.small}
                                    color={colorNames.black}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
