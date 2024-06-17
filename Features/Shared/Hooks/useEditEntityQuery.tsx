import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";

interface Props<T> {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
    service: ApiService<T, T>;
}
function useEditEntityQuery<T>({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
    service,
}: Props<T>) {
    return useMutation({
        mutationFn: (entity: T) => service.put(entity),
        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            reset();
            setEditEntityDialog(false);
            setSubmitted(true);

            toast.current?.show({
                severity: "success",
                summary: "Editado!",
                detail: "Registro editado correctamente",
                life: 3000,
            });
        },
    });
}

export default useEditEntityQuery;
