import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const const showError = (message: string) => {
  toast.error(message);
};

export const showLoading = (message: string): string => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};