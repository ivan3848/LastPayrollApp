"use client";

import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import IRol from "../Types/IRol";
import AddRol from "./AddRol";
import EditRol from "./EditRol";
import RolTable from "./RolTable";

const Rol = () => {
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
    } = useCrudModals<IRol>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IRol) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IRol) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = ["Horario", "Código", "Acciones"];

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
                        <RolTable
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddRol
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                            id={0}
                            submitted={submitted}
                        />
                    )}

                    {editEntityDialog && (
                        <EditRol
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                            id={0}
                        />
                    )}

                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idRol ?? 0}
                            endpoint="employee/rol"
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

export default Rol;
