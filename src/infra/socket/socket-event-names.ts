export const socketEventNames = {
    createItem: "createItem",
    updateItem: "updateItem",
    deleteItem: "deleteItem",
} as const;

export type SocketEventName = keyof typeof socketEventNames;
