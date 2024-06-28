import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Fieldset } from "primereact/fieldset";
import { IEmployee } from "../Types/IEmployee";
import EmployeeProfile from "./EmployeeProfile";
import { useState } from "react";

interface Props {
    showEmployeeActions: boolean;
    setShowEmployeeActions: (value: boolean) => void;
    employee: IEmployee;
}

const EmployeeActions = ({
    showEmployeeActions,
    setShowEmployeeActions,
    employee,
}: Props) => {
    const [dialogHeader, setDialogHeader] = useState<string>(
        "Seleccione una acción"
    );
    const [openAction, setOpenAction] = useState<string>(
        "Seleccione una acción"
    );

    const handleActionClick = (action: string) => {
        setOpenAction(action);
        switch (openAction) {
            case "false":
                setDialogHeader("Desactivar Empleado");
                break;

            default:
                setDialogHeader("Seleccione una acción");
                setOpenAction("");
                break;
        }
    };

    return (
        <>
            <Dialog
                visible={showEmployeeActions}
                onHide={() => setShowEmployeeActions(false)}
                dismissableMask
                draggable
                maximizable
                resizable
                header={dialogHeader}
                focusOnShow
                style={{ width: "850px" }}
            >
                <div className="my-5">
                    <EmployeeProfile employee={employee} />
                </div>

                <Fieldset legend="Funciones" toggleable>
                    <Button
                        label="Cubrir Posición"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Gestión Bancaria"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Dependientes"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Seguros"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Herramientas"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Desvincular"
                        icon="pi pi-search"
                        className="m-2"
                    />
                </Fieldset>

                <br />

                <Fieldset legend="Compensaciones" toggleable>
                    <Button
                        label="Beneficios"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Deducciones"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Prestamos"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="ISR A Favor"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Comisiones"
                        icon="pi pi-search"
                        className="m-2"
                    />
                </Fieldset>

                <br />

                <Fieldset legend="Absentismos" toggleable>
                    <Button
                        label="Licencias"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Permisos"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Horas Extras"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Plan De Horario"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Vacaciones"
                        icon="pi pi-search"
                        className="m-2"
                    />
                    <Button
                        label="Suplencias"
                        icon="pi pi-search"
                        className="m-2"
                    />
                </Fieldset>
            </Dialog>
        </>
    );
};

export default EmployeeActions;
