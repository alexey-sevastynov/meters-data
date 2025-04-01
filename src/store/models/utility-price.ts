import { UnitName } from "@/types/value-names";
import { WithObjectId } from "@/types/with-object-id";

export interface UtilityPrice extends WithObjectId {
    category: string;
    image: string[]; // INFO - source: "assets/icon/...", format: [name].png
    valueName: UnitName;
    value: number;
}
