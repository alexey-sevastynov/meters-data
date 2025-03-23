import { envKeys } from "@/enums/env-keys";
import { getStringEnv } from "@/helpers/get-string-env";

export function isValidLoginInput(value: string) {
    return value === getStringEnv(envKeys.email) || value === getStringEnv(envKeys.password);
}
