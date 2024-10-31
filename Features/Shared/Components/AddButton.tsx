import { Button } from "primereact/button";
import React from "react";
import { useModuleAccess } from "../Hooks/useModuleAccess";

interface Props<T> {
    entity: T;
    handleAdd: (entity: T) => void;
    accessName?: string;
}

function AddButton<T>({ handleAdd, entity, accessName }: Props<T>) {
    const canWrite = useModuleAccess(accessName!);

    return (
        <>
            {canWrite && (
                <Button
                    icon="pi pi-plus"
                    rounded
                    severity="info"
                    label="Agregar"
                    onClick={() => handleAdd(entity)}
                />
            )}
        </>
    );
}

export default AddButton;
