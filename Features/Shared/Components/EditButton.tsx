import { Button } from "primereact/button";
import React from "react";

interface Props<T> {
    entity: T;
    handleEdit: (entity: T) => void;
}

function EditButton<T>({ handleEdit, entity }: Props<T>) {
    return (
        <>
            <Button
                icon="pi pi-edit"
                rounded
                severity="info"
                label="Editar"
                onClick={() => handleEdit(entity)}
            />
        </>
    );
}

export default EditButton;
