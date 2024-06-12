import { useMutation } from "@tanstack/react-query";
import { IDepartment } from "../Types/IDepartment";
import departmentService from "../Services/departmentService";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditDepartmentQuery = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IDepartment) => departmentService.put(entity),
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

export default useEditDepartmentQuery;
