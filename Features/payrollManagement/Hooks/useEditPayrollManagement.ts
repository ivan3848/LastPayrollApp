import { useMutation } from "@tanstack/react-query";
import payrollManagementService from "../payrollManagementService";

interface Props {
    toast: React.MutableRefObject<any>;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditPayrollManagement = ({
    toast,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IPayrollManagement) => payrollManagementService.put(entity),

        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error?.response?.data,
                life: 3000,
            });
        },
        onSuccess: (text: any) => {

            if (text.toString().includes("Hay")) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: text,
                    life: 3000,
                });
                return;
            }

            reset();
            setSubmitted(true);

            toast.current?.show({
                severity: "success",
                summary: "Editado!",
                detail: "Registro editado correctamente",
                life: 3000,
            });
        },
    });
};

export default useEditPayrollManagement;
