import { useMutation } from "@tanstack/react-query";
import { IComplementaryData } from "../Types/IComplementaryData";
import complementaryDataService from "../Services/complementaryDataService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    setNotExistedEmployeeData: (value: IComplementaryData[]) => void;
    setIsExistEmployee: (value: boolean) => void;
}

const useAddComplementaryDataQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    setNotExistedEmployeeData,
    setIsExistEmployee,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IComplementaryData) =>
            complementaryDataService.post(entity),
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
            ) as IComplementaryData[];
            setNotExistedEmployeeData(notExistedEmployeeDataArray);
            setIsExistEmployee(true);
            toast.current?.show({
                severity: "success",
                summary: "Insertado!",
                detail: "Data Complementaria agregada correctamente",
                life: 3000,
            });
        },
    });
};

export default useAddComplementaryDataQuery;
