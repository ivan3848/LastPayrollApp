import { useMutation } from "@tanstack/react-query";
import contabilizationService from "../Services/contabilizationServices";

interface Props {
    toast: React.MutableRefObject<any>;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useContabilizationQuery = ({
    toast,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IContabilization) => contabilizationService.post(entity),

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
                detail: "Registro editado correctamente",
                life: 3000,
            });
        },
    });
};

export default useContabilizationQuery;
