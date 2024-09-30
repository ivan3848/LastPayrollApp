import { CACHE_KEY_LEASE } from "@/constants/cacheKeys";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";

interface Props {
    id: number;
    endpoint: string;
    deleteEntityDialog: boolean;
    setDeleteEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    setHide: (value: boolean) => void;
}

const DeleteEmploye = ({
    id,
    deleteEntityDialog,
    setDeleteEntityDialog,
    setSubmitted,
    endpoint,
    toast,
}: Props) => {
    const apiService = new ApiService(endpoint);
    const expireQuery = useExpireSessionQuery([CACHE_KEY_LEASE]);

    const deleteRegister = useMutation({
        mutationFn: (id: number) => apiService.delete(id),
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
            setSubmitted(true);
            expireQuery();
            toast.current?.show({
                severity: "success",
                summary: "Eliminado!",
                detail: "Registro Desactivado correctamente",
                life: 3000,
            });
        },
    });
    const handleDelete = () => {
        deleteRegister.mutate(id);
    };

    const hideDeleteEntityDialog = () => {
        setDeleteEntityDialog(false);
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
            visible={deleteEntityDialog}
            style={{ width: "450px" }}
            header="Desactivar Registro"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteEntityDialog}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                />
                {id && <span>¿Está seguro de descativar el registro?</span>}
            </div>
        </Dialog>
    );
};

export default DeleteEmploye;
