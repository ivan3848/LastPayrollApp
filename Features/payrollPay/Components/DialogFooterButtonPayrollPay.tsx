import { Button } from "primereact/button";

interface Props {
    isReadOnly?: boolean;
}

const DialogFooterButtonPayrollPay = ({ isReadOnly }: Props) => {
    return (
        <div
            className="flex justify-content-end mt-3"
            style={{ width: "30%", gap: "5px", marginLeft: "auto" }}
        >
            <Button
                label="Correr Nómina"
                icon="pi pi-check"
                raised
                disabled={isReadOnly}
            />
        </div>
    );
};

export default DialogFooterButtonPayrollPay;