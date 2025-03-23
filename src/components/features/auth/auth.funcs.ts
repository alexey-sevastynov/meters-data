import { envKeys } from "@/enums/env-keys";
import { getStringEnv } from "@/helpers/get-string-env";

export function isValidCredentials(email: string, password: string) {
    return email === getStringEnv(envKeys.email) && password === getStringEnv(envKeys.password);
}
