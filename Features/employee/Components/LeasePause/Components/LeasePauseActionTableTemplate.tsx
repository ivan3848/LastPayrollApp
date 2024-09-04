import { Button } from "primereact/button";
import React from "react";

interface Props<T> {
    entity: T;
    handleAddLeasePause: (entity: T) => void;
}

function LeasePauseActionTableTemplate<T>({
    entity,
    handleAddLeasePause,
}: Props<T>) {
    return (
        <>
            {
                <Button
                    className="mr-2"
                    label="Seleccionar"
                    rounded
                    severity="info"
                    onClick={() => handleAddLeasePause(entity)}
                />
            }
        </>
    );
}

export default LeasePauseActionTableTemplate;
