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
                type="button"
                raised
                severity="info"
                text
            />
            <Button
                label="Generar Archivos"
                icon="pi pi-file-excel"
                onClick={setGenereateFiles}
                type="button"
                raised
                severity="success"
                text
            />
            <Button
                label="Correr Nómina"
                icon="pi pi-check"
                type="submit"
                raised
                disabled={isReadOnly}
            />
        </div>
    );
};

export default DialogFooterButtonPayrollPay;