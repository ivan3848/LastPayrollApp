import { CACHE_KEY_EMPLOYEE, CACHE_KEY_LEASE } from "@/constants/cacheKeys";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";

interface Props {
    id: number;
    endpoint: string;
    reactivateEntityDialog: boolean;
    setReactivateEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const ReactivateEmployee = ({
    id,
    reactivateEntityDialog,
    setReactivateEntityDialog,
    setSubmitted,
    endpoint,
    toast,
}: Props) => {
    const apiService = new ApiService(endpoint);
    const expireQuery = useExpireSessionQuery([CACHE_KEY_EMPLOYEE]);

    const activateEmployee = useMutation({
        mutationFn: (id: number) => apiService.reactivate(id),

        onError: (error: any) => {
            var text = error.response.data;
            if (text.toString().includes("Hay")) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: "Hay nominas libre para calculo",
                    life: 3000,
                });
                return;
            }
            setReactivateEntityDialog(false);

            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },

        onSuccess: (text: any) => {
            console.log(text);
            if (text.toString().includes("Hay")) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: text,
                    life: 3000,
                });
                return;
            }
            setReactivateEntityDialog(false);
            setSubmitted(true);
            expireQuery();
            toast.current?.show({
                severity: "success",
                summary: "Eliminado!",
                detail: "Registro Activado correctamente",
                life: 3000,
            });
        },
    });
    const handleDelete = () => {
        activateEmployee.mutate(id);
    };

    const hideDeleteEntityDialog = () => {
        setReactivateEntityDialog(false);
    };

    const deleteProductDialogFooter = (
        <>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                onClick={hideDeleteEntityDialog}
            />
            <Button
                label="Confirmar"
                icon="pi pi-check"
                text
                onClick={handleDelete}
            />
        </>
    );
    return (
        <Dialog
            visible={reactivateEntityDialog}
            style={{ width: "450px" }}
            header="Activar Registro"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteEntityDialog}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                />
                {id && <span>¿Está seguro de activar el registro?</span>}
            </div>
        </Dialog>
    );
};

export default ReactivateEmployee;
