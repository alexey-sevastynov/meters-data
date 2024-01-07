import React, { useEffect, useState } from "react";
import Styles from "./ValueUtilityPrices.module.scss";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  editServicePrice,
  fetchAllServices,
} from "../../../redux/slices/ServicesSlice";

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
  const status = useAppSelector((props) => props.services.patch.status);
  const [valueInput, setValueInput] = useState<number>(value);
  const [idStatus, setIdStatus] = useState<string>("");

  const editValueUtilityPrice = () => {
    if (id && valueInput) {
      dispatch(editServicePrice({ _id: id, value: valueInput }));
      setIdStatus(id);
    }
  };

  useEffect(() => {
    if (status === "loaded" && id === idStatus) {
      dispatch(fetchAllServices());
    }
  }, [status, dispatch, id, idStatus]);

  return (
    <div className={Styles.valueUtilityPrices}>
      <p>1 {valueName} =</p>

      <Input defaultValue={value} value={valueInput} setValue={setValueInput} />
      {id === idStatus && (
        <>
          {status === "loading" && <p>Loading...</p>}
          {status === "loaded" && <p>Loaded!</p>}
          {status === "error" && <p>Error!</p>}
        </>
      )}

      <Button
        type="button"
        disabled={valueInput === value}
        onClick={editValueUtilityPrice}
      >
        publish
      </Button>
    </div>
  );
};
