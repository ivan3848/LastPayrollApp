import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { CACHE_KEY_EMPLOYEE } from "@/constants/cacheKeys";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";

interface Props<T, Q> {
    toast?: React.MutableRefObject<any>;
    setAddEntityDialog?: (value: boolean) => void;
    setSubmitted?: (value: boolean) => void;
    reset?: () => void;
    service: ApiService<T, Q>;
    setEntity?: (value: any) => void;
    setCustomAddDialog?: (openAddAmortization: boolean) => void;
    message?: string;
}

function useFiredEmployeeEntityQuery<T, Q>({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
    service,
    setEntity,
    setCustomAddDialog,
    message,
}: Props<T, Q>) {
    const expireQuery = useExpireSessionQuery([CACHE_KEY_EMPLOYEE]);
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
            if (data.toString().includes("Hay")) {
                toast?.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: data,
                    life: 3000,
                });
                expireQuery();
                return;
            }

            if (reset) reset();
            if (setAddEntityDialog) setAddEntityDialog(false);
            if (setCustomAddDialog) setCustomAddDialog(false);
            if (setSubmitted) setSubmitted(true);
            if (setEntity) setEntity(data);
            expireQuery();

            toast?.current?.show({
                severity: "success",
                summary: "Insertado!",
                detail: message ?? "Registro agregado correctamente",
                life: 3000,
            });
        },
    });
}

export default useFiredEmployeeEntityQuery;
