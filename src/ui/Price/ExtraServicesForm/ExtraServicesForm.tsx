import React, { useEffect, useState } from "react";
import Styles from "./extraServicesForm.module.scss";
import { Select } from "../../../components/Select/Select";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

import { AppDispatch } from "../../../redux/store";
import { addServiceToCurrentItem } from "../../../redux/slices/PriceSlice";

import useUtilityPrices from "../../../hooks/useUtilityPrices";

interface ExtraServicesFormProps {
  dispatch: AppDispatch;
}

export const ExtraServicesForm: React.FC<ExtraServicesFormProps> = ({
  dispatch,
}) => {
  const { items } = useUtilityPrices();
  const options = items.filter(
    ({ category }) =>
      category !== "Light general" &&
      category !== "Light day" &&
      category !== "Light night" &&
      category !== "Water" &&
      category !== "Gas"
  );

  const [selectedOption, setSelectedOption] = useState<string>(
    options[0]?.category || "Fixed Water"
  );
  const currentItemValue =
    options.find((item) => item.category === selectedOption)?.value || 0;
  const currentId = options.find(
    (item) => item.category === selectedOption
  )?._id;

  const [inputValue, setInputValue] = useState<number>(currentItemValue);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const editValueUtilityPrice = () => {
    if (currentId && inputValue) {
      dispatch(
        addServiceToCurrentItem({
          title: selectedOption,
          description: inputValue,
        })
      );
    }
  };

  useEffect(() => {
    setInputValue(currentItemValue);
  }, [selectedOption]);

  return (
    <form className={Styles.extraServicesForm}>
      <div className={Styles.inputs}>
        <Select
          className={Styles.select}
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
        />

        <Input
          className={Styles.input}
          value={inputValue}
          setValue={setInputValue}
          defaultValue={currentItemValue}
          labelTextBold
        />
      </div>
      <div className={Styles.btns}>
        <Button type="button" onClick={editValueUtilityPrice}>
          add
        </Button>
      </div>
    </form>
  );
};
