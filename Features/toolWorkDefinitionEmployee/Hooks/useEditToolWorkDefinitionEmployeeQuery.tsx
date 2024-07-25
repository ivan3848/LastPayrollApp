import { useMutation } from "@tanstack/react-query";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import toolWorkDefinitionEmployeeService from "../Services/toolWorkDefinitionEmployeeService";

interface Props {
    toast: React.MutableRefObject<any>;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useEditToolWorkDefinitionEmployeeQuery = ({
    toast,
    setEditEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IToolWorkDefinitionEmployee) =>
            toolWorkDefinitionEmployeeService.put(entity),
        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            if (reset) reset();
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

export default useEditToolWorkDefinitionEmployeeQuery;
