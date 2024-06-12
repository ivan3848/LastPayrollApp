import { useMutation } from "@tanstack/react-query";
import { IEducation } from "../Types/IEducation";
import educationService from "../Services/educationService";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditEducationQuery = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IEducation) => educationService.put(entity),
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

export default useEditEducationQuery;
