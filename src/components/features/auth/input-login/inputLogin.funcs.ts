import { envKeys } from "@/infra/env/env-keys";
import { getStringEnv } from "@/infra/env/env-functions";

export function isValidLoginInput(value: string) {
    return value === getStringEnv(envKeys.email) || value === getStringEnv(envKeys.password);
}
