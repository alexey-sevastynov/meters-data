export const statusNames = {
    inactive: "inactive",
    loading: "loading",
    loaded: "loaded",
    error: "error",
} as const;

export type StatusName = keyof typeof statusNames;
