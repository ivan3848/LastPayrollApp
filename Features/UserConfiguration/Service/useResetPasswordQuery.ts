import { useMutation } from "@tanstack/react-query";
import { userResetPassword } from "../Service/userService";
import { IResetPassword } from "../Types/IResetPassword";

interface Props {
    toast: React.MutableRefObject<any>;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useResetPasswordQuery = ({ toast, setSubmitted, reset }: Props) => {
    return useMutation({
        mutationFn: (entity: IResetPassword) => userResetPassword.post(entity),

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
                detail: "Contraseña editada correctamente",
                life: 3000,
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        },
    });
};

export default useResetPasswordQuery;
