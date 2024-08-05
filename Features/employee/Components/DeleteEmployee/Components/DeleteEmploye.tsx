"use client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useDeleteEmployeeQuery from "../Hooks/useDeleteEmployeeQuery";
import { Toast } from "primereact/toast";

interface Props {
    idEmployee: number;
    deleteEntityDialog: boolean;
    setDeleteEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    setShowEmployeeActions: (value: boolean) => void;
}

const DeleteEmployee = ({
    idEmployee,
    deleteEntityDialog,
    setDeleteEntityDialog,
    toast,
    setShowEmployeeActions,
}: Props) => {
    const handleSubmit = () => {
        setDeleteEntityDialog(true);
    };

    const deleteEmployeeEntity = useDeleteEmployeeQuery({
        idEmployee,
        toast,
        deleteEntityDialog,
        setDeleteEntityDialog,
    });

    const handleDelete = async () => {
        await deleteEmployeeEntity
            .mutateAsync(idEmployee)
            .then(() => setShowEmployeeActions(false));

        return;
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
        <>
            <Toast ref={toast} />
            <Button onClick={handleSubmit} severity="danger" label="Eliminar" />
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
                    {idEmployee && (
                        <span>¿Está seguro de eliminar el Empleado?</span>
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default DeleteEmployee;
