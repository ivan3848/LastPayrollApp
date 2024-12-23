import { Button } from "primereact/button";
import React from "react";
import { useModuleAccess } from "../Hooks/useModuleAccess";

interface Props<T> {
    entity: T;
    handleEdit: (entity: T) => void;
    accessName?: string;
}

function EditButton<T>({ handleEdit, entity, accessName }: Props<T>) {
    const canWrite = useModuleAccess(accessName!);

    return (
        <>
            {canWrite && (
                <Button
                    icon="pi pi-edit"
                    rounded
                    severity="info"
                    label="Editar"
                    onClick={() => handleEdit(entity)}
                />
            )}
        </>
    );
}

export default EditButton;
