import { useMutation } from "@tanstack/react-query";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import toolWorkDefinitionEmployeeService from "../Services/toolWorkDefinitionEmployeeService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useAddToolWorkDefinitionEmployeeQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IToolWorkDefinitionEmployee) =>
            toolWorkDefinitionEmployeeService.post(entity),
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

export default useAddToolWorkDefinitionEmployeeQuery;
