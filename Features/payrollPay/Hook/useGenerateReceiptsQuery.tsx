import { useMutation } from "@tanstack/react-query";
import { IDeletePayrollPayDto } from "../Components/DeletePayrollDialog";
import { deletePayrollPayService, generateReceiptService } from "../Services/payrollPayService";
import { IGenerateReceipt } from "../Components/GenerateReceipt";

interface Props {
    toast: React.MutableRefObject<any>;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useGenerateReceiptsQuery = ({
    toast,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IGenerateReceipt) => generateReceiptService.post(entity),

        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => { },
    });
};

export default useGenerateReceiptsQuery;
