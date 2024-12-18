"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import AddToolWorkDefinitionEmployee from "./AddToolWorkDefinitionEmployee";
import EditToolWorkDefinitionEmployee from "./EditToolWorkDefinitionEmployee";
import Loading from "@/app/loading";
interface Props {
    id: number;
}
const ToolWorkDefinitionEmployeeTable = dynamic(
    () => import("./ToolWorkDefinitionEmployeeTable"),
    {
        loading: () => <Loading />,
    }
);

const ToolWorkDefinitionEmployee = ({ id }: Props) => {
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
    } = useCrudModals<IToolWorkDefinitionEmployee>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IToolWorkDefinitionEmployee) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IToolWorkDefinitionEmployee) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Herramienta De Trabajo",
        // "Código",
        // "Descripción",
        // "Acciones",
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
                        <ToolWorkDefinitionEmployeeTable
                            idEmployee={id}
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddToolWorkDefinitionEmployee
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                            idEmployee={id}
                        />
                    )}

                    {editEntityDialog && (
                        <EditToolWorkDefinitionEmployee
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                            idEmployee={id}
                        />
                    )}
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idToolWorkDefinitionEmployee ?? 0}
                            endpoint="employee/ToolWorkDefinitionEmployee"
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

export default ToolWorkDefinitionEmployee;
