import { Button } from "primereact/button";

interface Props {
    hideDialog: () => void;
}

const DialogFooterButtonPayrollPayDetails = ({ hideDialog }: Props) => {
    return (
        <div
            className="flex justify-content-end mt-3"
            style={{ width: "30%", gap: "5px", marginLeft: "auto" }}
        >
            <Button
                label="Cerrar"
                icon="pi pi-sign-out"
                raised
                type="button"
                onClick={hideDialog}
            />
        </div>
    );
};

export default DialogFooterButtonPayrollPayDetails;
