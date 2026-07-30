import { toast } from 'sonner';

export function toastSuccess(msg: string) {
    return toast.success(msg, {
        className: '!bg-green-300 !border-none',
        duration: 2000,
    });
}

export function toastError(msg: string) {
    return toast.error(msg, {
        className: '!bg-red-300 !border-none',
        duration: 2000,
    });
}
