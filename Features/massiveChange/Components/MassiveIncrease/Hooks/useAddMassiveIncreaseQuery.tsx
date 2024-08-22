import { useMutation } from "@tanstack/react-query";
import { Employee, IMassiveIncrease } from "../Types/IMassiveIncrease";
import massiveIncreaseService from "../Services/massiveIncreaseService";
import MassiveIncrease from "../Components/MassiveIncrease";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    setNotExistedEmployeeData: (value: IMassiveIncrease[]) => void;
    setIsExistEmployee: (value: boolean) => void;
}

const useAddMassiveIncreaseQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    setNotExistedEmployeeData,
    setIsExistEmployee,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IMassiveIncrease) =>
            massiveIncreaseService.post(entity),
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
            ) as IMassiveIncrease[];
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

export default useAddMassiveIncreaseQuery;
