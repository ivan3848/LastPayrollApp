import { Button } from "primereact/button";
import React from "react";
import Amortization from "../../Amortization/Amortization";

interface Props<T> {
    entity: T;
    handleEdit?: (entity: T) => void;
    handleDelete: (entity: T) => void;
    isCustomDelete?: boolean;
    handlePay?: (entity: T) => void;
    handleAmortize?: (entity: T) => void;
}

function LeaseActionTableTemplate<T>({
    entity,
    handleEdit,
    handleDelete,
    handlePay,
    handleAmortize,
}: Props<T>) {
    var lease = entity as ILease;
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

            {handlePay && (
                <Button
                    className="mr-2 bg-blue-500 text-white"
                    text
                    label="Pagar"
                    title="Pagar"
                    rounded
                    onClick={() => handlePay(entity)}
                />
            )}
            {handleAmortize && (
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

            {handleDelete && (
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
