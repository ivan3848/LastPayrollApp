import { useMutation } from "@tanstack/react-query";
import { IInsertCommission } from "../Types/IInsertCommission";
import commissionService from "../Services/commissionService";
import { ICommissionDetail } from "../Types/ICommissionDetail";
import commissionDetailService from "../../CommissionDetail/Services/commissionDetailService";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditCommission = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: ICommissionDetail) =>
            commissionDetailService.put(entity),

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
            setEditEntityDialog(false);
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

export default useEditCommission;
