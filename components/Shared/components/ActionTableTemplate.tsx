import { Button } from "primereact/button";
import React from "react";

interface Props<T> {
    entity: T;
    handleEdit: (entity: T) => void;
    handleDelete: (entity: T) => void;
}

function ActionTableTemplate<T>({
    entity,
    handleEdit,
    handleDelete,
}: Props<T>) {
    console.log(entity);
    return (
        <>
            <Button
                icon="pi pi-pencil"
                className="mr-2"
                rounded
                severity="info"
                onClick={() => handleEdit(entity)}
            />
            <Button
                icon="pi pi-trash"
                rounded
                severity="secondary"
                onClick={() => handleDelete(entity)}
            />
        </>
    );
}

export default ActionTableTemplate;
