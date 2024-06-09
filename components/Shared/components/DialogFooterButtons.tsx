import { Button } from "primereact/button";
import React from "react";

interface Props {
    hideDialog: () => void;
}

const DialogFooterButtons = ({ hideDialog }: Props) => {
    return (
        <div className="flex justify-content-end">
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                type="button"
                onClick={hideDialog}
            />
            <Button label="Guardar" icon="pi pi-check" />
        </div>
    );
};

export default DialogFooterButtons;
