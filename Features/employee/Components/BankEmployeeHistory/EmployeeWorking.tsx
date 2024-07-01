"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import EmployeeChanges from "./EmployeeChanges";
import { IEmployeeHistory } from "../../Types/IEmployeeHistory";

const EmployeeWorking = () => {
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
    } = useCrudModals<IEmployeeHistory>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IEmployeeHistory) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IEmployeeHistory) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Nombre del empleado",
        "Fecha de inicio",
        "Horario",
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
                    <EmployeeChanges
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                </Suspense>

                {/* {editEntityDialog && (
                        // <EditEmployeeWorkScheduler
                        //     entity={entity!}
                        //     editEntityDialog={editEntityDialog}
                        //     setEditEntityDialog={setEditEntityDialog}
                        //     setSubmitted={setSubmitted}
                        //     toast={toast}
                        // />
                    )} */}
                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idWorkScheduler ?? 0}
                        endpoint="employee/employee"
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

export default EmployeeWorking;
