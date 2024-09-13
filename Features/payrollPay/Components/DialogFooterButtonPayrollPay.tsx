import { Button } from "primereact/button";


const DialogFooterButtonPayrollPay = () => {
    return (
        <div
            className="flex justify-content-end mt-3"
            style={{ width: "30%", gap: "5px", marginLeft: "auto" }}
        >
            <Button label="Correr Nómina" icon="pi pi-check" raised />
        </div>
    );
};

export default DialogFooterButtonPayrollPay;