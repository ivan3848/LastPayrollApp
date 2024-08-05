import { CACHE_KEY_EMPLOYEE } from "@/constants/cacheKeys";
import { deleteEmployeeService } from "@/Features/employee/Services/employeeService";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface Props {
    idEmployee: number;
    deleteEntityDialog: boolean;
    setDeleteEntityDialog: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const useDeleteEmployeeQuery = ({
    setDeleteEntityDialog,
    toast,
}: Props) => {
    const expireQuery = useExpireSessionQuery(CACHE_KEY_EMPLOYEE);

    return useMutation({
        mutationFn: (idEmployee: number) =>
            deleteEmployeeService.delete(idEmployee),
        onError: (error: any) => {
            setDeleteEntityDialog(false);

            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            setDeleteEntityDialog(false);
            expireQuery();

            toast.current?.show({
                severity: "success",
                summary: "Eliminado!",
                detail: "Registro eliminado correctamente",
                life: 3000,
            });
        },
    });
};

export default useDeleteEmployeeQuery;
