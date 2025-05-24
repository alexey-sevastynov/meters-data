import { useAppSelector } from "@/store/hook";
import styles from "./utilityAccount.module.scss";
import { useLocation } from "react-router-dom";
import { BillingAccount } from "@/store/models/billing-account";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

// TODO: template component UtilityAccount
export function MdBillingAccounts() {
    const translations = useAppSelector(selectTranslations);
    const { pathname } = useLocation();
    const currentAddressName: string = pathname.slice(1).replace("/price", "");
    const items = useAppSelector((state) => state.billingAccounts.items);
    const status = useAppSelector((state) => state.billingAccounts.status);
    const errorMessage = useAppSelector((state) => state.billingAccounts.errorMessage);
    const item: BillingAccount | undefined = items.find((i) => i.address.includes(currentAddressName));

    if (status === "loading") return <p>loading...</p>;

    if (status === "error") return <p>error: {errorMessage}</p>;

    return (
        <div className={styles.utilityAccount}>
            <h2 className={styles.utilityAccountTitle}>{translations.utilityAccount.title}</h2>

            {/* todo: add items & item component later */}
            <div className={styles.utilityAccountItems}>
                {item?.light && (
                    <div className={styles.utilityAccountItemsItem}>
                        <p>{translations.utilityAccount.light}:</p>
                        <div className={styles.utilityAccountItemsItemContent}>
                            <p className={styles.utilityAccountItemsItemContentValue}>{item?.light}</p>
                            <button
                                title={translations.utilityAccount.copy}
                                className={styles.utilityAccountItemsItemContentCopy}
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
                    <div className={styles.utilityAccountItemsItem}>
                        <p>{translations.utilityAccount.water}:</p>
                        <div className={styles.utilityAccountItemsItemContent}>
                            <p className={styles.utilityAccountItemsItemContentValue}>{item?.water}</p>
                            <button
                                title={translations.utilityAccount.copy}
                                className={styles.utilityAccountItemsItemContentCopy}
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
                    <div className={styles.utilityAccountItemsItem}>
                        <p>{translations.utilityAccount.gas}:</p>
                        <div className={styles.utilityAccountItemsItemContent}>
                            <p className={styles.utilityAccountItemsItemContentValue}>{item?.gas}</p>
                            <button
                                title={translations.utilityAccount.copy}
                                className={styles.utilityAccountItemsItemContentCopy}
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
