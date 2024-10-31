import { Button } from "primereact/button";
import React from "react";
import { useModuleAccess } from "../Hooks/useModuleAccess";

interface Props<T> {
    entity: T;
    handleEdit?: (entity: T) => void;
    handleDelete: (entity: T) => void;
    isCustomDelete?: boolean;
    accessName?: string;
}

function ActionTableTemplate<T>({
    entity,
    handleEdit,
    handleDelete,
    isCustomDelete,
    accessName,
}: Props<T>) {
    const canWrite = useModuleAccess(accessName!);

    return (
        <>
            {canWrite && handleEdit && (
                <Button
                    icon="pi pi-pencil"
                    className="mr-2"
                    rounded
                    severity="info"
                    onClick={() => handleEdit(entity)}
                />
            )}
            {canWrite && handleDelete && (
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
