import { useMutation } from "@tanstack/react-query";
import { IMassiveEmployee } from "../Types/IMassiveEmployee";
import massiveEmployeeService from "../Services/massiveEmployeeService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    setNotExistedEmployeeData: (value: IMassiveEmployee[]) => void;
    setIsExistEmployee: (value: boolean) => void;
}

const useAddMassiveEmployeeQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    setNotExistedEmployeeData,
    setIsExistEmployee,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IMassiveEmployee) =>
            massiveEmployeeService.post(entity),
        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: (e) => {
            setAddEntityDialog(false);
            setSubmitted(true);
            const notExistedEmployeeDataArray = Object.values(
                e
            ) as IMassiveEmployee[];
            setNotExistedEmployeeData(notExistedEmployeeDataArray);
            setIsExistEmployee(true);
            toast.current?.show({
                severity: "success",
                summary: "Insertado!",
                detail: "Registro agregado correctamente",
                life: 3000,
            });
        },
    });
};

export default useAddMassiveEmployeeQuery;
