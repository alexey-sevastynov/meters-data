import { StatusName, statusNames } from "@/constants/status";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { UtilityCost } from "@/types/utility-cost";

export interface InfoMeterReading {
    address001: UtilityCost[] | null;
    address002: UtilityCost[] | null;
    address003: UtilityCost[] | null;
    address004: UtilityCost[] | null;
    address005: UtilityCost[] | null;
}

export const initialState: IMetersDataSlice = {
    items: [],
    status: statusNames.inactive,
    meterDataEdit: null,
    isEdit: false,
    infoMeterReading: {
        address001: null,
        address002: null,
        address003: null,
        address004: null,
        address005: null,
    },
};

export interface IMetersDataSlice {
    items: MeterDataWithObjectId[];
    status: StatusName;
    meterDataEdit: MeterDataWithObjectId | null;
    isEdit: boolean;
    infoMeterReading: InfoMeterReading;
}
