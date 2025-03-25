import { UnitName } from "@/types/value-names";
import { WithId } from "@/types/with-id";

export interface UtilityPrice extends WithId {
    category: string;
    image: string[]; // INFO - source: "assets/icon/...", format: [name].png
    valueName: UnitName;
    value: number;
}
