import { useMutation } from "@tanstack/react-query";
import { IDeletePayrollPayDto } from "../Components/DeletePayrollDialog";
import { deletePayrollPayService } from "../Services/payrollPayService";

interface Props {
    toast: React.MutableRefObject<any>;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useDeletePayrollPay = ({
    toast,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IDeletePayrollPayDto) => deletePayrollPayService.post(entity),

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
            setSubmitted(true);

            toast.current?.show({
                severity: "success",
                summary: "Editado!",
                detail: "Registro eliminado correctamente",
                life: 3000,
            });
        },
    });
};

export default useDeletePayrollPay;
