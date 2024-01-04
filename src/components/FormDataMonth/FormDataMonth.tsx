import React, { useState } from "react";
import Style from "./formDataMonth.module.scss";
import { Input } from "../Input/Input";
import { SelectDate } from "../SelectDate/SelectDate";
import { Button } from "../Button/Button";

export const FormDataMonth = () => {
  return (
    <form className={Style.formDataMonth}>
      <div className={Style.inputs}>
        <SelectDate />
        <Input
          className={Style.input}
          labelTextBold
          value={4720.23}
          labelText="Light general"
        />
        <Input
          className={Style.input}
          labelTextBold
          value={4720.23}
          labelText="Light day"
        />
        <Input
          className={Style.input}
          labelTextBold
          value={4720.23}
          labelText="Light night"
        />
        <Input
          className={Style.input}
          labelTextBold
          value={1009.23}
          labelText="Gas general"
        />
        <Input
          className={Style.input}
          labelTextBold
          value={1009.23}
          labelText="Water general"
        />
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
