import React from "react";
import Styles from "./ValueUtilityPrices.module.scss";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

interface ValueUtilityPricesProps {
  valueName: "kW" | "m³" | "piece";
  value: number;
}

export const ValueUtilityPrices: React.FC<ValueUtilityPricesProps> = ({
  valueName,
  value,
}) => {
  return (
    <div className={Styles.valueUtilityPrices}>
      <p>1 {valueName} =</p>

      <Input value={value} />

      <Button>publish</Button>
    </div>
  );
};
