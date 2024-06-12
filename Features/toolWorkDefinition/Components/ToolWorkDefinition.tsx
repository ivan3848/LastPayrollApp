"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IToolWorkDefinition } from "../Types/IToolWorkDefinition";
import AddToolWorkDefinition from "./AddToolWorkDefinition";
import EditToolWorkDefinition from "./EditToolWorkDefinition";

const ToolWorkDefinitionTable = dynamic(() => import("./ToolWorkDefinitionTable"));

const ToolWorkDefinition = () => {
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
    } = useCrudModals<IToolWorkDefinition>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IToolWorkDefinition) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IToolWorkDefinition) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = ["Herramienta De Trabajo","Código", "Descripción", "Acciones"];

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
                        <ToolWorkDefinitionTable
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddToolWorkDefinition
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}

                    {editEntityDialog && (
                        <EditToolWorkDefinition
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idToolWorkDefinition ?? 0}
                            endpoint="employee/toolWorkDefinition"
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

export default ToolWorkDefinition;
