import { Button } from "primereact/button";

interface Props {
    isReadOnly?: boolean;
    setGenereateFiles: () => void;
    setGenereate?: () => void;
}

const DialogFooterButtonPayrollPay = ({ isReadOnly, setGenereateFiles, setGenereate }: Props) => {
    return (
        <div
            className="flex justify-content-end mt-3"
            style={{ width: "50%", gap: "5px", marginLeft: "auto" }}
        >
            <Button
                label="Generar comprobante"
                icon="pi pi-receipt"
                onClick={setGenereate}
                raised
                severity="info"
                text
            />
            <Button
                label="Generar Archivos"
                icon="pi pi-file-excel"
                onClick={setGenereateFiles}
                raised
                severity="success"
                text
            />
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