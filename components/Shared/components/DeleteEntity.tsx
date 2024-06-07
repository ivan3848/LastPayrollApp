import ApiService from "@/services/ApiService";
import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";

interface Props {
    id: number;
    endpoint: string;
    deleteEntityDialog: boolean;
    setModalOpen: (value: boolean) => void;
    setHasChanged: (value: boolean) => void;
}

const DeleteEntity = ({
    id,
    deleteEntityDialog,
    setModalOpen,
    setHasChanged,
    endpoint,
}: Props) => {
    const apiService = new ApiService(endpoint);

    const deleteRegister = useMutation({
        mutationFn: (id: number) => apiService.delete(id),
        onError: (error: any) => {
            toast.warning(error.response.data);
        },
        onSuccess: () => {
            setModalOpen(false);
            setHasChanged(true);
            toast.success("Registro eliminado correctamente");
        },
    });

    const handleDelete = async () => {
        deleteRegister.mutate(id);
    };

    const deleteProductDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                text
                onClick={hideDeleteProductDialog}
            />
            <Button
                label="Yes"
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
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
        >
            <div className="flex align-items-center justify-content-center">
                <i
                    className="pi pi-exclamation-triangle mr-3"
                    style={{ fontSize: "2rem" }}
                />
                {id && (
                    <span>
                        ¿Está seguro de que desea eliminar este registro?
                    </span>
                )}
            </div>
        </Dialog>
    );
};

export default DeleteEntity;
