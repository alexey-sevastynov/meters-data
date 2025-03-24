export const statusNames = {
    inactive: "inactive",
    loading: "loading",
    loaded: "loaded",
    error: "error",
} as const;

export type StatusType = keyof typeof statusNames;
