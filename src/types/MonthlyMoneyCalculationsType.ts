import { AddressType } from "./MeterDataType";

export type MonthlyMoneyCalculationsType = {
  _id?: string;
  address: AddressType;
  data: [{ _id?: string; title: string; description: string }];
  sumMoney: number;
};
