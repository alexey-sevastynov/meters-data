import { envKeys } from "@/infra/env/env-keys";
import { getStringEnv } from "@/infra/env/env-functions";

export function isValidCredentials(email: string, password: string) {
    return email === getStringEnv(envKeys.email) && password === getStringEnv(envKeys.password);
}
