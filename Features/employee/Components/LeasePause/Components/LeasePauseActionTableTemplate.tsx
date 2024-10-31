import { useModuleAccess } from "@/Features/Shared/Hooks/useModuleAccess";
import { Button } from "primereact/button";
import React from "react";

interface Props<T> {
    entity: T;
    handleAddLeasePause: (entity: T) => void;
    accessName?: string;
}

function LeasePauseActionTableTemplate<T>({
    entity,
    accessName,
    handleAddLeasePause,
}: Props<T>) {
    const canWrite = useModuleAccess(accessName!);

    return (
        <>
            {canWrite && (
                <Button
                    className="mr-2"
                    label="Seleccionar"
                    rounded
                    severity="info"
                    onClick={() => handleAddLeasePause(entity)}
                />
            )}
        </>
    );
}

export default LeasePauseActionTableTemplate;
