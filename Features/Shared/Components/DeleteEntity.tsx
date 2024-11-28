import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import useExpireSessionQuery from "../Hooks/useExpireSessionQuery";
import {
    CACHE_KEY_LEASE,
    CACHE_KEY_USER_CONFIGURATION,
} from "@/constants/cacheKeys";

interface Props {
    id: number;
    endpoint: string;
    deleteEntityDialog: boolean;
    setDeleteEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const DeleteEntity = ({
    id,
    deleteEntityDialog,
    setDeleteEntityDialog,
    setSubmitted,
    endpoint,
    toast,
}: Props) => {
    const apiService = new ApiService(endpoint);
    const expireQuery = useExpireSessionQuery([
        CACHE_KEY_LEASE,
        CACHE_KEY_USER_CONFIGURATION,
    ]);

    const deleteRegister = useMutation({
        mutationFn: (id: number) => apiService.delete(id),
        onError: (error: any) => {
            setDeleteEntityDialog(false);

            const text = error.response.data;
            if (text.toString().includes("Hay")) {
                toast.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: "Hay nominas libre para calculo",
                    life: 3000,
                });
                return;
            }
        },
        onSuccess: (data: any) => {
            if (data.toString().includes("Hay")) {
                toast?.current?.show({
                    severity: "warn",
                    summary: "Advertencia",
                    detail: data,
                    life: 3000,
                });
                expireQuery();
                return;
            }

            setDeleteEntityDialog(false);
            setSubmitted(true);
            expireQuery();
            toast.current?.show({
                severity: "success",
                summary: "Eliminado!",
                detail: "Registro eliminado correctamente",
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
            header="Eliminar Registro"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteEntityDialog}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                />
                {id && <span>¿Está seguro de eliminar el registro?</span>}
            </div>
        </Dialog>
    );
};

export default DeleteEntity;
