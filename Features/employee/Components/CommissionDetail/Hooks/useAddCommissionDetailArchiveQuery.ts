import { useMutation } from "@tanstack/react-query";
import { ICommissionArchive } from "../../Commission/Types/ICommission";
import { addCommissionArchiveService } from "../../Commission/Services/commissionService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
}
const useAddCommissionDetailArchiveQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
}: Props) => {
    return useMutation({
        mutationFn: (entity: ICommissionArchive) =>
            addCommissionArchiveService.post(entity),
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

export default useAddCommissionDetailArchiveQuery;
