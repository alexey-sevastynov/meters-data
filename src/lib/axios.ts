import axios from "axios";
import { getStringEnv } from "@/infra/env/env-functions";
import { envKeys } from "@/infra/env/env-keys";

export const apiClient = axios.create({
    baseURL: getStringEnv(envKeys.apiUrl),
    headers: {
        "x-api-key": getStringEnv(envKeys.apiKey),
    },
});
