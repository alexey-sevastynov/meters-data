import { WithId } from "@/types/with-id";

export interface BillingAccount extends WithId {
    address: string;
    light: string;
    gas: string;
    water: string;
}
