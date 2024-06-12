"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { ICostCenter } from "../Types/ICostCenter";
import AddCostCenter from "./AddCostCenter";
import EditCostCenter from "./EditCostCenter";

const CostCenterTable = dynamic(() => import("./CostCenterTable"));

const CostCenter = () => {
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
    } = useCrudModals<ICostCenter>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: ICostCenter) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: ICostCenter) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Centro de costo",
        "Número de cuenta",
        "Acciones",
    ];

    return (
        <div className="grid">
            <div className="w-full">
                <div className="card">
                    <Toast ref={toast} />

                    <Suspense
                        fallback={
                            <TableSkeletonTemplate items={entityProperties} />
                        }
                    >
                        <CostCenterTable
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddCostCenter
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}

                    {editEntityDialog && (
                        <EditCostCenter
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idCostCenter ?? 0}
                            endpoint="employee/costCenter"
                            deleteEntityDialog={deleteEntityDialog}
                            setDeleteEntityDialog={setDeleteEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CostCenter;
