"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";

interface props {
    id: number;
}

const Contabilization = ({ id }: props) => {

    const {
        deleteEntityDialog,
        setDeleteEntityDialog,
        addEntityDialog,
        setAddEntityDialog,
        editEntityDialog,
        setEditEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
    } = useCrudModals<IContabilization>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IContabilization) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IContabilization) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Concepto",
        "Doctor",
        "Doctor Exequatur",
        "Descripción",
        "Fecha Inicio",
        "Fecha Final"
    ];

    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />
                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    {/* <LicenseTable
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        idEmployee={id}
                    /> */}
                </Suspense>

                {/* {editEntityDialog && (
                    <EditLicense
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}

                {addEntityDialog && (
                    <AddLicense
                        id={id}
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        handleAdd={handleAdd}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )} */}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idPayrollPay ?? 0}
                        endpoint="employee/payrollPay"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                )}
            </div>
        </div>
    );
};

export default Contabilization;
