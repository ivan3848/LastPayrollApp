import { Button } from "primereact/button";
import React from "react";

interface Props<T> {
    entity: T;
    Contabilization1?: (entity: T) => void;
    Contabilization2?: (entity: T) => void;
    handleDelete?: (entity: T) => void;
    isCustomDelete?: boolean;
}

function ActionsTableContabilization<T>({
    entity,
    Contabilization1,
    Contabilization2,
    handleDelete,
    isCustomDelete,
}: Props<T>) {
    return (
        <>
            {Contabilization1 && (
                <Button
                    icon="pi pi-calculator"
                    className="mr-2"
                    rounded
                    severity="info"
                    onClick={() => Contabilization1(entity)}
                />
            )}
            {Contabilization2 && (
                <Button
                    icon="pi pi-calculator"
                    className="mr-2"
                    rounded
                    severity="success"
                    onClick={() => Contabilization2(entity)}
                />
            )}
            {handleDelete && (
                <>
                    {isCustomDelete ? (
                        <Button
                            icon="pi pi-undo"
                            rounded
                            severity="danger"
                            onClick={() => handleDelete(entity)}
                        />
                    ) : (
                        <Button
                            icon="pi pi-ban"
                            rounded
                            severity="danger"
                            onClick={() => handleDelete(entity)}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default ActionsTableContabilization;
