import axios from "axios";
import { envKeys } from "@/infra/env/env-keys";
import { getStringEnv } from "@/infra/env/env-functions";
import { ApiEndpointName } from "@/store/api-endpoint-names";
import { apiClient } from "@/lib/axios";

export const apiUrl = getStringEnv(envKeys.apiUrl);

export async function getAll<T>(endpoint: ApiEndpointName) {
    const { data } = await apiClient.get<T[]>(endpoint);

    return data;
}

export async function createOne<T>(endpoint: string, body: T) {
    const { data } = await apiClient.post<T>(endpoint, body);

    return data;
}

export async function getOne<T>(endpoint: string, id: string) {
    const { data } = await apiClient.get<T>(`${endpoint}/${id}`);

    return data;
}

export async function deleteOne<T>(endpoint: string, id: string) {
    const { data } = await apiClient.delete<T>(`${endpoint}/${id}`);

    return data;
}

export async function updateOne<T>(endpoint: string, id: string, body: Partial<T>) {
    const { data } = await apiClient.patch<T[]>(`${endpoint}/${id}`, body);

    return data;
}
