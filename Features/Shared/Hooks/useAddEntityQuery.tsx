import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";

interface Props<T> {
    toast?: React.MutableRefObject<any>;
    setAddEntityDialog?: (value: boolean) => void;
    setSubmitted?: (value: boolean) => void;
    reset?: () => void;
    service: ApiService<T, T>;
    setEntity: (value: any) => void;
}
function useAddEntityQuery<T>({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
    service,
    setEntity,
}: Props<T>) {
    return useMutation({
        mutationFn: async (entity: T) => {
            try {
                const response = await service.post(entity);
                if (reset) reset();
                if (setAddEntityDialog) setAddEntityDialog(false);
                if (setSubmitted) setSubmitted(true);
                setEntity(response);
                toast?.current?.show({
                    severity: "success",
                    summary: "Insertado!",
                    detail: "Registro agregado correctamente",
                    life: 3000,
                });
            } catch (error: any) {
                toast?.current?.show({
                    severity: "warn",
                    summary: "Error",
                    detail: error.response.data,
                    life: 3000,
                });
            }
        },
    });
}

export default useAddEntityQuery;
