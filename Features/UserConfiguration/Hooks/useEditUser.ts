import { useMutation } from "@tanstack/react-query";
import { userInsertService } from "../Service/userService";
import { IInsertUser } from "../Types/IInsertUser";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditDependant = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IInsertUser) => userInsertService.put(entity),

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

export default useEditDependant;
