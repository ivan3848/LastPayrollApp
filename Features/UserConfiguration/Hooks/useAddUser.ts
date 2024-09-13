import { useMutation } from "@tanstack/react-query";
import { IInsertUser } from "../Types/IInsertUser";
import { userInsertService } from "../Service/userService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}

const useAddUser = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IInsertUser) => userInsertService.post(entity),
        onError: (error: any) => {
            toast.current.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            reset();
            setAddEntityDialog(false);
            setSubmitted(true);
            toast.current.show({
                severity: "success",
                summary: "Éxito",
                detail: "Usuario agregado correctamente",
                life: 3000,
            });
        },
    });
};

export default useAddUser;
