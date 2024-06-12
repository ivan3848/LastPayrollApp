"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IBenefitPosition } from "../Types/IBenefitPosition";
import AddBenefitPosition from "./AddBenefitPosition";
import EditBenefitPosition from "./EditBenefitPosition";

const BenefitPositionTable = dynamic(() => import("./BenefitPositionTable"));

const BenefitPosition = () => {
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
    } = useCrudModals<IBenefitPosition>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IBenefitPosition) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IBenefitPosition) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = ["Posición", "Concepto", "Acciones"];

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
                        <BenefitPositionTable
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddBenefitPosition
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}

                    {editEntityDialog && (
                        <EditBenefitPosition
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idBenefitPosition ?? 0}
                            endpoint="employee/benefitPosition"
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

export default BenefitPosition;
