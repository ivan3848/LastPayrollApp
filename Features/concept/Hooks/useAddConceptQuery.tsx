import { useMutation } from "@tanstack/react-query";
import { IConcept } from "../Types/IConcept";
import conceptService from "../Services/conceptService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useAddConceptQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IConcept) => conceptService.post(entity),
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

export default useAddConceptQuery;
