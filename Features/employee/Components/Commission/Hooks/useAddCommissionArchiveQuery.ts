import { useMutation } from "@tanstack/react-query";
import { ICommission } from "../Types/ICommission";
import { commissionServiceToInsert } from "../Services/commissionService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
}
const useAddCommissionArchiveQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
}: Props) => {
    return useMutation({
        mutationFn: (entity: ICommission) =>
            commissionServiceToInsert.post(entity),
        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            setAddEntityDialog(false);
            setSubmitted(true);

            toast.current?.show({
                severity: "success",
                summary: "Insertado!",
                detail: "Registro agregado correctamente",
                life: 3000,
            });
        },
    });
};

export default useAddCommissionArchiveQuery;
