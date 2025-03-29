import axios from "axios";
import { envKeys } from "@/enums/env-keys";
import { getStringEnv } from "@/helpers/get-string-env";
import { ApiEndpointName } from "@/store/api-endpoint-names";

export const apiUrl = getStringEnv(envKeys.apiUrl);

export async function getAllResource<T>(endpoint: ApiEndpointName) {
    const { data } = await axios.get<T[]>(`${apiUrl}${endpoint}`);

    return data;
}

export async function updateResource<T>(endpoint: string, id: string, body: Partial<T>) {
    const { data } = await axios.patch<T[]>(`${apiUrl}${endpoint}/${id}`, body);

    return data;
}
