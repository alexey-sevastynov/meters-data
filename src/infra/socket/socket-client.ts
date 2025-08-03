import { isDev } from "@/lib/environments";
import { io, Socket } from "socket.io-client";
import { AppDispatch } from "@/store/store";
import { getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";
import { SocketEventName, socketEventNames } from "@/infra/socket/socket-event-names";

const socketUrl = isDev() ? "http://localhost:3000" : "https://meters-socket-server.up.railway.app";
let socket: Socket | null = null;

export function initSocket(dispatch: AppDispatch) {
    if (!socket) {
        socket = io(socketUrl, { transports: ["websocket"] });

        socket.on("connect", () => {
            console.log("Socket connected:", socket?.id);
        });

        socket.on(socketEventNames.createItem, () => {
            dispatch(getAllMetersData());
        });

        socket.on(socketEventNames.updateItem, () => {
            dispatch(getAllMetersData());
        });

        socket.on(socketEventNames.deleteItem, () => {
            dispatch(getAllMetersData());
        });
    }
}

export function emitMetaDataSocketEvent(eventName: SocketEventName, payload: unknown) {
    if (socket) {
        socket.emit(eventName, payload);
    }
}
