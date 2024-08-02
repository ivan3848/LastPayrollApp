import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import useExpireSessionQuery from "./useExpireSessionQuery";
import { CACHE_KEY_POSITION } from "@/constants/cacheKeys";

interface Props<T> {
    toast?: React.MutableRefObject<any>;
    setAddEntityDialog?: (value: boolean) => void;
    setSubmitted?: (value: boolean) => void;
    reset?: () => void;
    service: ApiService<T, T>;
    setEntity?: (value: any) => void;
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
            if (setSubmitted) setSubmitted(true);
            if (setEntity) setEntity(data);

            toast?.current?.show({
                severity: "success",
                summary: "Insertado!",
                detail: "Registro agregado correctamente",
                life: 3000,
            });
        },
    });
}

export default useAddEntityQuery;
