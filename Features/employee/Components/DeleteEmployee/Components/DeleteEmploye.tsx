"use client";
import { Button } from "primereact/button";
import { deleteEmployeeService } from "@/Features/employee/Services/employeeService";
import { Dialog } from "primereact/dialog";
import { useMutation } from "@tanstack/react-query";

interface Props {
    idEmployee: number;
    deleteEntityDialog: boolean;
    setDeleteEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const DeleteEmployee = ({
    idEmployee,
    deleteEntityDialog,
    setDeleteEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const handleSubmit = () => {
        setDeleteEntityDialog(true);
    };

    const deleteRegister = useMutation({
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
            setSubmitted(true);

            toast.current?.show({
                severity: "success",
                summary: "Eliminado!",
                detail: "Registro eliminado correctamente",
                life: 3000,
            });
        },
    });
    const handleDelete = () => {
        deleteRegister.mutate(idEmployee);
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
            <Button
                onClick={() => handleSubmit()}
                severity="danger"
                label="Eliminar"
            />
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
    // const entityProperties = ["Nombre", "Relación", "Acción"];

    // return (
    //     <div>
    //         <Toast ref={toast} />

    //         <Suspense
    //             fallback={<TableSkeletonTemplate items={entityProperties} />}
    //         >

    //         </Suspense>
    //     </div>
    // );
};

export default DeleteEmployee;
