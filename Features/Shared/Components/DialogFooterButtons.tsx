import { Button } from "primereact/button";

interface Props {
    hideDialog: () => void;
}

const DialogFooterButtons = ({ hideDialog }: Props) => {
    return (
        <div className="flex justify-content-end mt-3">
            <Button
                label="Cancelar"
                icon="pi pi-times"
                text
                raised
                type="button"
                onClick={hideDialog}
            />
            <Button label="Guardar" icon="pi pi-check" />
        </div>
    );
};

export default DialogFooterButtons;
