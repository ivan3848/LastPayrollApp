import { Button } from "primereact/button";
import React from "react";
import Amortization from "../../Amortization/Amortization";
import { useModuleAccess } from "@/Features/Shared/Hooks/useModuleAccess";

interface Props<T> {
    entity: T;
    handleEdit?: (entity: T) => void;
    handleDelete: (entity: T) => void;
    isCustomDelete?: boolean;
    handlePayment?: (entity: T) => void;
    handleAmortize?: (entity: T) => void;
    accessName?: string;
}

function LeaseActionTableTemplate<T>({
    entity,
    handleEdit,
    handleDelete,
    handlePayment,
    handleAmortize,
    accessName,
}: Props<T>) {
    var lease = entity as ILease;
    const canWrite = useModuleAccess(accessName!);

    return (
        <>
            {handleEdit && canWrite && (
                <Button
                    icon="pi pi-pencil"
                    className="mr-2"
                    rounded
                    severity="info"
                    onClick={() => handleEdit(entity)}
                />
            )}

            {handlePayment && canWrite && (
                <Button
                    className="mr-2 bg-blue-500 text-white"
                    text
                    label="Pagar"
                    title="Pagar"
                    rounded
                    onClick={() => handlePayment(entity)}
                />
            )}
            {handleAmortize && canWrite && (
                <>
                    <Button
                        className="mr-2 bg-blue-500 text-white"
                        text
                        label="Amortizar"
                        title="Amortizar"
                        rounded
                        onClick={() => handleAmortize(entity)}
                    />
                </>
            )}

            {handleDelete && canWrite && (
                <>
                    <Button
                        icon="pi pi-trash"
                        rounded
                        severity="secondary"
                        onClick={() => handleDelete(entity)}
                    />
                </>
            )}
        </>
    );
}

export default LeaseActionTableTemplate;
