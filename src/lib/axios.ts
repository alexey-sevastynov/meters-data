import axios from "axios";
import { getStringEnv } from "@/infra/env/env-functions";
import { envKeys } from "@/infra/env/env-keys";

const apiKey = getStringEnv(envKeys.apiKey);

export const apiClient = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        "x-api-key": apiKey,
    },
});

function getApiBaseUrl() {
    const apiUrl = getStringEnv(envKeys.apiUrl);
    const apiPrefix = "api";
    const apiBaseUrl = apiUrl + apiPrefix;

    return apiBaseUrl;
}
