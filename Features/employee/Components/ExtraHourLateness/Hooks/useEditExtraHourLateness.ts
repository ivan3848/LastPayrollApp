import { useMutation } from "@tanstack/react-query";
import extraHourLatenessService from "../Services/extraHourLatenessServices";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditExtraHourLateness = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IExtraHourLateness) =>
            extraHourLatenessService.put(entity),

        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: (data: any) => {
            
            if (data.toString().includes("Hay")) {
                toast?.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: data,
                    life: 3000,
                });
                return;
            }

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

export default useEditExtraHourLateness;