import { toast } from "react-toastify";

const loadingMessage = "Loading...";
const successMessage = "Success!";
const errorMessage = "Request error 🤯 😣";

export const toastService = {
    loading: (message = loadingMessage) => toast.loading(message),
    success: (message = successMessage) => {
        toast.dismiss();
        toast.success(message);
    },
    error: (message = errorMessage) => {
        toast.dismiss();
        toast.error(message);
    },
} as const;
