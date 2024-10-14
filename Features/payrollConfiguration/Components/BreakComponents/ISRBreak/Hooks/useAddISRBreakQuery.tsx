import { useMutation } from "@tanstack/react-query";
import IISRBreak from "../Types/IISRBreak";
import { ISRBreakUpdate } from "../Services/isrBreakService";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { CACHE_KEY_PAYROLL_CONFIGURATION } from "@/constants/cacheKeys";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useAddISRBreakQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    const expireQuery = useExpireSessionQuery([
        CACHE_KEY_PAYROLL_CONFIGURATION,
    ]);
    return useMutation({
        mutationFn: (entity: IISRBreak) => ISRBreakUpdate.put(entity),
        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
            expireQuery();
        },
        onSuccess: () => {
            reset();
            setAddEntityDialog(false);
            setSubmitted(true);
            expireQuery();

            toast.current?.show({
                severity: "success",
                summary: "Insertado!",
                detail: "Registro Acualizado correctamente",
                life: 3000,
            });
        },
    });
};

export default useAddISRBreakQuery;
