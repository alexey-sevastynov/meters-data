import React, { useState } from "react";
import Style from "./formDataMonth.module.scss";
import { SelectDate } from "../../../components/SelectDate/SelectDate";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

interface FormDataMonthProps {
  isWaterBlock: boolean;
}

export const FormDataMonth: React.FC<FormDataMonthProps> = ({
  isWaterBlock,
}) => {
  return (
    <form className={Style.formDataMonth}>
      <div className={Style.inputs}>
        <SelectDate />
        <Input
          className={Style.input}
          labelTextBold
          defaultValue={4720.23}
          labelText="Light general"
        />
        <Input
          className={Style.input}
          labelTextBold
          defaultValue={4720.23}
          labelText="Light day"
        />
        <Input
          className={Style.input}
          labelTextBold
          defaultValue={4720.23}
          labelText="Light night"
        />
        <Input
          className={Style.input}
          labelTextBold
          defaultValue={1009.23}
          labelText="Gas general"
        />
        {isWaterBlock && (
          <Input
            className={Style.input}
            labelTextBold
            defaultValue={1009.23}
            labelText="Water general"
          />
        )}
      </div>

      <div className={Style.btns}>
        {/* @ts-ignore */}
        <Button type="button">clear</Button>
        {/* @ts-ignore */}
        <Button type="submit">add</Button>
      </div>
    </form>
  );
};
