import { CACHE_KEY_EMPLOYEE } from "@/constants/cacheKeys";
import { reactivateEmployeeService } from "@/Features/employee/Services/employeeService";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface Props {
    idEmployee: number;
    reactivateEntityDialog: boolean;
    setReactivateEntityDialog: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const useReactivateEmployeeQuery = ({
    setReactivateEntityDialog,
    toast,
}: Props) => {
    const expireQuery = useExpireSessionQuery(CACHE_KEY_EMPLOYEE);

    return useMutation({
        mutationFn: (idEmployee: number) =>
            reactivateEmployeeService.reactivate(idEmployee),
        onError: (error: any) => {
            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
            expireQuery();
        },
        onSuccess: (text) => {
            console.log(text);

            setReactivateEntityDialog(false);
            expireQuery();

            toast.current?.show({
                severity: "success",
                summary: "Reactivación!",
                detail: "Registro reactivado correctamente",
                life: 3000,
            });
        },
    });
};

export default useReactivateEmployeeQuery;
