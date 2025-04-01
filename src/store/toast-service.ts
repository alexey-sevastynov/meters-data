import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ToastMessages {
    loading?: string;
    success?: string;
    error?: string;
}

const defaultLoadingMessage = "Loading...";
const defaultSuccessMessage = "Success!";
const defaultErrorMessage = "Request error 🤯 😣";

const toastNotificationService = {
    loading: (message = defaultLoadingMessage) => toast.loading(message),
    success: (message = defaultSuccessMessage) => {
        toast.dismiss();
        toast.success(message);
    },
    error: (message = defaultErrorMessage) => {
        toast.dismiss();
        toast.error(message);
    },
} as const;

export function addToastNotifications<T, R, A, S>(
    builder: ActionReducerMapBuilder<T>,
    action: AsyncThunk<R, A, { state: S }>,
    messages?: ToastMessages
) {
    builder.addCase(action.pending, () => {
        toastNotificationService.loading(messages?.loading);
    });

    builder.addCase(action.fulfilled, () => {
        toastNotificationService.success(messages?.success);
    });

    builder.addCase(action.rejected, () => {
        toastNotificationService.error(messages?.error);
    });
}
