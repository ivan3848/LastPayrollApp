"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IToolWorkPosition } from "../Types/IToolWorkPosition";
import AddToolWorkPosition from "./AddToolWorkPosition";
import EditToolWorkPosition from "./EditToolWorkPosition";

const ToolWorkPositionTable = dynamic(() => import("./ToolWorkPositionTable"));

const ToolWorkPosition = () => {
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
    } = useCrudModals<IToolWorkPosition>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IToolWorkPosition) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IToolWorkPosition) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = ["Posición", "Herramienta", "Acciones"];

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
                        <ToolWorkPositionTable
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddToolWorkPosition
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}

                    {editEntityDialog && (
                        <EditToolWorkPosition
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idPositionToolWorkDefinition ?? 0}
                            endpoint="employee/positionToolWorkDefinition"
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

export default ToolWorkPosition;
