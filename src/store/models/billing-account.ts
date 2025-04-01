import { WithObjectId } from "@/types/with-object-id";

export interface BillingAccount extends WithObjectId {
    address: string;
    light: string;
    gas: string;
    water: string;
}
