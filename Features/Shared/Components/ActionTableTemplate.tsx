import { Button } from "primereact/button";
import React from "react";

interface Props<T> {
    entity: T;
    handleEdit?: (entity: T) => void;
    handleDelete: (entity: T) => void;
    isCustomDelete?: boolean;
}

function ActionTableTemplate<T>({
    entity,
    handleEdit,
    handleDelete,
    isCustomDelete,
}: Props<T>) {
    return (
        <>
            {handleEdit && (
                <Button
                    icon="pi pi-pencil"
                    className="mr-2"
                    rounded
                    severity="info"
                    onClick={() => handleEdit(entity)}
                />
            )}
            {handleDelete && (
                <>
                    {isCustomDelete ? (
                        <Button
                            icon="pi pi-undo"
                            rounded
                            severity="secondary"
                            onClick={() => handleDelete(entity)}
                        />
                    ) : (
                        <Button
                            icon="pi pi-trash"
                            rounded
                            severity="secondary"
                            onClick={() => handleDelete(entity)}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default ActionTableTemplate;
