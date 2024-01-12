import React, { useState } from "react";
import Styles from "./valueUtilityPrices.module.scss";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { useAppDispatch } from "../../../redux/hook";
import {
  editServicePrice,
  fetchAllServices,
} from "../../../redux/slices/ServicesSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ValueUtilityPricesProps {
  id: string;
  valueName: "kW" | "m³" | "piece";
  value: number;
}

export const ValueUtilityPrices: React.FC<ValueUtilityPricesProps> = ({
  valueName,
  value,
  id,
}) => {
  const dispatch = useAppDispatch();

  const [valueInput, setValueInput] = useState<number>(value);

  const editValueUtilityPrice = () => {
    if (id && valueInput) {
      dispatch(editServicePrice({ _id: id, value: valueInput })).then(
        (action) => {
          if (action.payload) {
            setTimeout(() => {
              dispatch(fetchAllServices());
            }, 2500);
          }
        }
      );
    }
  };

  return (
    <div className={Styles.valueUtilityPrices}>
      <p>1 {valueName} =</p>

      <Input defaultValue={value} value={valueInput} setValue={setValueInput} />

      <Button
        type="button"
        disabled={valueInput === value}
        onClick={editValueUtilityPrice}
      >
        publish
      </Button>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
