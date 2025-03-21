import React, { useEffect, useState } from "react";
import Styles from "./extraServicesForm.module.scss";
import { MdSelect } from "@/components/ui/select/MdSelect";
import { MdInput } from "@/components/ui/input/MdInput";
import { MdButton } from "@/components/ui/button/MdButton";
import { AppDispatch } from "@/redux/store";
import { addServiceToCurrentItem } from "@/redux/slices/PriceSlice";
import useUtilityPrices from "@/hooks/useUtilityPrices";

interface ExtraServicesFormProps {
  dispatch: AppDispatch;
}

export function MdExtraServicesForm({ dispatch }: ExtraServicesFormProps) {
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

  const [inputValue, setInputValue] = useState<string>(
    String(currentItemValue)
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const editValueUtilityPrice = () => {
    if (currentId && inputValue) {
      dispatch(
        addServiceToCurrentItem({
          title: selectedOption,
          description: inputValue,
          percentDifference: 0,
        })
      );
    }
  };

  useEffect(() => {
    setInputValue(String(currentItemValue));
  }, [selectedOption]);

  return (
    <form className={Styles.extraServicesForm}>
      <div className={Styles.inputs}>
        <MdSelect
          className={Styles.select}
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
        />

        <MdInput
          className={Styles.input}
          value={inputValue}
          setValue={setInputValue}
          defaultValue={currentItemValue}
          labelTextBold
        />
      </div>
      <div className={Styles.btns}>
        <MdButton
          type="button"
          onClick={editValueUtilityPrice}
        >
          add
        </MdButton>
      </div>
    </form>
  );
}
