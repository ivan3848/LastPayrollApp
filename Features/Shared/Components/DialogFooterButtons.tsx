import { Button } from "primereact/button";

interface Props {
    hideDialog: () => void;
}

const DialogFooterButtons = ({ hideDialog }: Props) => {
    return (
        <div
            className="flex justify-content-end mt-3"
            style={{ width: "30%", gap: "5px", marginLeft: "auto" }}
        >
            <Button
                label="Cancelar"
                icon="pi pi-times"
                raised
                onClick={hideDialog}
                severity="danger"
            />
            <Button label="Guardar" icon="pi pi-check" raised />
        </div>
    );
};

export default DialogFooterButtons;
