import { useMutation } from "@tanstack/react-query";
import extraHourLatenessDataService from "../Services/extraHourLatenessService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    setNotExistedEmployeeData: (value: IExtraHourLatenessData[]) => void;
    setIsExistEmployee: (value: boolean) => void;
}

const useAddExtraHourLatenessDataQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    setNotExistedEmployeeData,
    setIsExistEmployee,
}: Props) => {
    return useMutation({
        mutationFn: (entity: IExtraHourLatenessData) =>
            extraHourLatenessDataService.post(entity),
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
            ) as IExtraHourLatenessData[];
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

export default useAddExtraHourLatenessDataQuery;
