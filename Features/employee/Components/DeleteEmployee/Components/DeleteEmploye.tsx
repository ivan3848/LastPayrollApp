import { CACHE_KEY_EMPLOYEE, CACHE_KEY_LEASE } from "@/constants/cacheKeys";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import { confirmDialog } from "primereact/confirmdialog";

interface Props {
    id: number;
    endpoint: string;
    deleteEntityDialog: boolean;
    setDeleteEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    confirmDialogText: string;
    summary: string;
    detail: string;
    header: string;
}

const DeleteEmploye = ({
    id,
    confirmDialogText,
    summary,
    deleteEntityDialog,
    detail,
    setDeleteEntityDialog,
    setSubmitted,
    endpoint,
    toast,
    header,
}: Props) => {
    const apiService = new ApiService(endpoint);
    const expireQuery = useExpireSessionQuery([CACHE_KEY_EMPLOYEE]);

    const deleteRegister = useMutation({
        mutationFn: (id: number) => apiService.delete(id),
        onError: (error: any) => {
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

            setDeleteEntityDialog(false);

            toast.current?.show({
                severity: "warn",
                summary: "Error",
                detail: error.response.data,
                life: 3000,
            });
        },
        onSuccess: () => {
            setSubmitted(true);
            expireQuery();
            toast.current?.show({
                severity: "success",
                summary: summary,
                detail: detail,
                life: 3000,
            });
            location.reload();
            setDeleteEntityDialog(false);
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
            header={header}
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteEntityDialog}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                />
                {id && <span>{confirmDialogText}</span>}
            </div>
        </Dialog>
    );
};

export default DeleteEmploye;
