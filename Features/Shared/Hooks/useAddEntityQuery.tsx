import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";

interface Props<T> {
    toast?: React.MutableRefObject<any>;
    setAddEntityDialog?: (value: boolean) => void;
    setSubmitted?: (value: boolean) => void;
    reset?: () => void;
    service: ApiService<T, T>;
    setEntity?: (value: any) => void;
    setCustomAddDialog?: (openAddAmortization: boolean) => void;
    message?: string;
}
function useAddEntityQuery<T>({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
    service,
    setEntity,
    setCustomAddDialog,
    message,
}: Props<T>) {
    return useMutation({
        mutationFn: (entity: T) => service.post(entity),
        onError: (error: any) => {
            toast?.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: (data: any) => {
            if (reset) reset();
            if (setAddEntityDialog) setAddEntityDialog(false);
            if (setCustomAddDialog) setCustomAddDialog(false);
            if (setSubmitted) setSubmitted(true);
            if (setEntity) setEntity(data);

            toast?.current?.show({
                severity: "success",
                summary: "Insertado!",
                detail: message ?? "Registro agregado correctamente",
                life: 3000,
            });
        },
    });
}

export default useAddEntityQuery;
