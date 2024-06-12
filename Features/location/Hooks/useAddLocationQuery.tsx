import { useMutation } from "@tanstack/react-query";
import { ILocation } from "../Types/ILocation";
import locationService from "../Services/locationService";

interface Props {
    toast: React.MutableRefObject<any>;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    reset: () => void;
}
const useAddLocationQuery = ({
    toast,
    setAddEntityDialog,
    setSubmitted,
    reset,
}: Props) => {
    return useMutation({
        mutationFn: (entity: ILocation) => locationService.post(entity),
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

export default useAddLocationQuery;
