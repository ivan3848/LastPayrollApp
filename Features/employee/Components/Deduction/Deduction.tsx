"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IDeduction } from "./Types/IDeduction";
import AddDeduction from "./AddDeduction";
import EditDeduction from "./EditDeduction";
import DeductionTable from "./DeductionTable";

interface props {
    id: number;
}

const Deduction = ({ id }: props) => {
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
    } = useCrudModals<IDeduction>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IDeduction) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IDeduction) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = ["Concepto", "Monto", "Inicio", "Final"];

    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />

                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    <DeductionTable
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        idEmployee={id}
                    />
                </Suspense>

                {editEntityDialog && (
                    <EditDeduction
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                        id={id}
                    />
                )}

                {addEntityDialog && (
                    <AddDeduction
                        id={id}
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        handleAdd={handleAdd}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idDeduction ?? 0}
                        endpoint="employee/deduction"
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

export default Deduction;
