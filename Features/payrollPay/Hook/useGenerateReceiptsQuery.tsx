import { useMutation } from "@tanstack/react-query";
import { generateReceiptService } from "../Services/payrollPayService";
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

        onSuccess: (data: any) => {
            if (data.toString().includes("comprobante")) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: data,
                    life: 3000,
                });
                return;
            }
            setSubmitted(true);
            reset();
        },
    });
};

export default useGenerateReceiptsQuery;
