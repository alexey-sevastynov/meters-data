import { errorMessage } from "@/constants/error-message";
import { EnvKey } from "@/infra/env/env-keys";
import { getPropertyValue } from "@/lib/utils";

export function getStringEnv(key: EnvKey) {
    const value = getPropertyValue<ImportMetaEnv, EnvKey, string>(import.meta.env, key);

    if (!value) throw new Error(errorMessage.missingEnvVar.replace("{0}", key));

    return value;
}
