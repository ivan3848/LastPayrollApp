import { Button } from "primereact/button";

interface Props<T> {
    entity: T;
    handleAdd: (entity: T) => void;
}

function AddButton<T>({ handleAdd, entity }: Props<T>) {
    return (
        <>
            <Button
                icon="pi pi-plus"
                rounded
                severity="info"
                label="Agregar"
                onClick={() => handleAdd(entity)}
            />
        </>
    );
}

export default AddButton;
