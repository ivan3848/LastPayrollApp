import { useMutation } from "@tanstack/react-query";
import { IPayrollConfiguration } from "../Types/IPayrollConfiguration";
import { PayrollConfigurationUpdate } from "../Services/payrollConfigurationService";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { CACHE_KEY_PAYROLL_CONFIGURATION } from "@/constants/cacheKeys";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditPayrollConfiguration = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    const expireQuery = useExpireSessionQuery([
        CACHE_KEY_PAYROLL_CONFIGURATION,
    ]);

    return useMutation({
        mutationFn: (entity: IPayrollConfiguration) =>
            PayrollConfigurationUpdate.put(entity),
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
            setEditEntityDialog(false);
            setSubmitted(true);

            toast.current?.show({
                severity: "success",
                summary: "Editado!",
                detail: "Configuración editada correctamente",
                life: 3000,
            });
            expireQuery();
        },
    });
};

export default useEditPayrollConfiguration;
