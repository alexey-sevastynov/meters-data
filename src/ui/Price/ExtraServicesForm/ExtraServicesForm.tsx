import React from "react";
import Styles from "./extraServicesForm.module.scss";
import { Select } from "../../../components/Select/Select";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { LIST_UTILITY_PRICES } from "../../../constants";

export const ExtraServicesForm = () => {
  return (
    <form className={Styles.extraServicesForm}>
      <div className={Styles.inputs}>
        <Select className={Styles.select} options={LIST_UTILITY_PRICES} />
        <Input className={Styles.input} defaultValue={1000} labelTextBold />
      </div>
      <div className={Styles.btns}>
        {/* @ts-ignore */}
        <Button type="button">clear</Button>
        {/* @ts-ignore */}
        <Button type="submit">add</Button>
      </div>
    </form>
  );
};
