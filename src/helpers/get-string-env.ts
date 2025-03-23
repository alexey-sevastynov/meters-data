import { errorMessage } from "@/constants/error-message";
import { EnvKey } from "@/enums/env-keys";

export function getStringEnv(key: EnvKey) {
    const value = import.meta.env[key] as string | undefined;

    if (!value) throw new Error(errorMessage.missingEnvVar.replace("{0}", key));

    return value;
}
