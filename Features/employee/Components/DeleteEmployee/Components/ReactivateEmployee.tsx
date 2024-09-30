"use client";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useState } from "react";
import useReactivateEmployeeQuery from "../Hooks/useReactivateEmployeeQuery";

interface Props {
    idEmployee: number;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    setShowEmployeeActions: (value: boolean) => void;
}

const ReactivateEmployee = ({
    idEmployee,
    toast,
    setShowEmployeeActions,
    setSubmitted,
}: Props) => {
    const handleSubmit = () => {
        setReactivateEntityDialog(true);
    };
    const [reactivateEntityDialog, setReactivateEntityDialog] = useState(false);

    const reactivateEntity = useReactivateEmployeeQuery({
        toast,
        setReactivateEntityDialog,
        idEmployee,
        reactivateEntityDialog,
    });

    const handleReactivate = async () => {
        await reactivateEntity.mutateAsync(idEmployee).then(() => {
            setShowEmployeeActions(false);
            setReactivateEntityDialog(false);
        });

        setSubmitted(true);
    };

    const hideReactivateEntityDialog = () => {
        setReactivateEntityDialog(false);
    };

    const reactivateProductDialogFooter = (
        <>
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                onClick={hideReactivateEntityDialog}
            />
            <Button
                label="Confirmar"
                icon="pi pi-check"
                text
                onClick={handleReactivate}
            />
        </>
    );
    return (
        <>
            <Toast ref={toast} />
            <Button
                onClick={handleSubmit}
                severity="success"
                label="Reactivar"
            />
            <Dialog
                visible={reactivateEntityDialog}
                style={{ width: "450px" }}
                header="Activar Registro"
                modal
                footer={reactivateProductDialogFooter}
                onHide={hideReactivateEntityDialog}
            >
                <div className="flex align-items-center justify-content-center">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {idEmployee && (
                        <span>¿Está seguro de activar el Empleado?</span>
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default ReactivateEmployee;
