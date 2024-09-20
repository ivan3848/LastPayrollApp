"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import ContabilizationTable from "./ContabilizationTable";
import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";
import FirstContabilization from "./FirstContabilization";
import SecondContabilization from "./SecondContabilization";


const Contabilization = () => {
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
    } = useCrudModals<IPayrollPay>();

    const handleContabilization1 = (entity: IPayrollPay) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleContabilization2 = (entity: IPayrollPay) => {
        setEntity(entity);
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleDelete = (entity: IPayrollPay) => {
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
                    {<ContabilizationTable
                        submitted={submitted}
                        handleContabilization1={handleContabilization1}
                        handleContabilization2={handleContabilization2}
                        handleDelete={handleDelete}
                    />}
                </Suspense>

                {editEntityDialog && (
                    <FirstContabilization
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}

                {addEntityDialog && (
                    <SecondContabilization
                        entity={entity!}
                        editEntityDialog={addEntityDialog}
                        setEditEntityDialog={setAddEntityDialog}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idPayrollPay ?? 0}
                        endpoint="employee/payrollPay/delete"
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
