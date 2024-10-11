import { useMutation } from "@tanstack/react-query";
import { SeniorityIncentiveBreakUpdateService } from "../Services/SeniorityIncentiveBreakUpdateService";
import { ISeniorityIncentiveBreak } from "../Types/ISeniorityIncentive";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditSeniorityIncentiveBreak = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: ISeniorityIncentiveBreak) =>
            SeniorityIncentiveBreakUpdateService.put(entity),
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

export default useEditSeniorityIncentiveBreak;
