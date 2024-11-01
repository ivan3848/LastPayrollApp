import { Button } from "primereact/button";
import React from "react";
import { useModuleAccess } from "../Hooks/useModuleAccess";

interface Props {
    handleAdd?: () => void;
    accessName?: string;
    labelButton?: string;
}

function AddSingleButton({ handleAdd, accessName, labelButton }: Props) {
    const canWrite = useModuleAccess(accessName!);

    return (
        <>
            {canWrite && (
                <Button
                    icon="pi pi-plus"
                    rounded
                    severity="info"
                    label={labelButton ? labelButton : "Agregar"}
                    onClick={() => handleAdd!()}
                />
            )}
        </>
    );
}

export default AddSingleButton;
