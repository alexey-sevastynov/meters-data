import { useAppSelector } from "@/redux/hook";
import { BsCopy } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { AddressType } from "@/types/MeterDataType";
import { AddressDataType } from "@/types/AddressDataType";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import Styles from "./utilityAccount.module.scss";
import { selectTranslations } from "@/redux/slices/I18next";

// template component UtilityAccount
export const UtilityAccount = () => {
  const lang = useAppSelector(selectTranslations);

  const { pathname } = useLocation();
  const currentAddressName: AddressType = pathname
    .slice(1)
    .replace("/price", "") as AddressType;

  const items = useAppSelector((props) => props.addressData.items);

  const item: AddressDataType | undefined = items.find((item) =>
    item.address.includes(currentAddressName)
  );

  return (
    <div className={Styles.utilityAccount}>
      <h2 className={Styles.utilityAccount__title}>
        {lang.utilityAccount.title}
      </h2>

      {/* todo: add items & item component later */}
      <div className={Styles.utilityAccount__items}>
        {item?.light && (
          <div className={Styles.utilityAccount__items_item}>
            <p>{lang.utilityAccount.light}:</p>
            <div className={Styles.utilityAccount__items_item_content}>
              <p className={Styles.utilityAccount__items_item_content_value}>
                {item?.light}
              </p>
              <button
                title={lang.utilityAccount.copy}
                className={Styles.utilityAccount__items_item_content_copy}
              >
                <BsCopy
                  size={SIZE_ICONS.small}
                  onClick={() => navigator.clipboard.writeText(item?.light)}
                />
              </button>
            </div>
          </div>
        )}

        {item?.water && (
          <div className={Styles.utilityAccount__items_item}>
            <p>{lang.utilityAccount.water}:</p>
            <div className={Styles.utilityAccount__items_item_content}>
              <p className={Styles.utilityAccount__items_item_content_value}>
                {item?.water}
              </p>
              <button
                className={Styles.utilityAccount__items_item_content_copy}
              >
                <BsCopy
                  size={SIZE_ICONS.small}
                  onClick={() => navigator.clipboard.writeText(item?.water)}
                />
              </button>
            </div>
          </div>
        )}

        {item?.gas && (
          <div className={Styles.utilityAccount__items_item}>
            <p>{lang.utilityAccount.gas}:</p>
            <div className={Styles.utilityAccount__items_item_content}>
              <p className={Styles.utilityAccount__items_item_content_value}>
                {item?.gas}
              </p>
              <button
                className={Styles.utilityAccount__items_item_content_copy}
              >
                <BsCopy
                  size={SIZE_ICONS.small}
                  onClick={() => navigator.clipboard.writeText(item?.gas)}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
