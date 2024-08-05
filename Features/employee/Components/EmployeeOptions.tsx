import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import React from "react";
import { EmployeeOptionsEnum } from "../Enums/EmployeeOptionsEnum";

interface Props {
    setAction: (action: EmployeeOptionsEnum) => void;
    onSubmit?: () => void;
}

const EmployeeOptions = ({ setAction }: Props) => {
    return (
        <div>
            <Fieldset legend="Funciones" toggleable className="mb-5">
                <Button
                    label="Gestión Bancaria"
                    icon="pi pi-building-columns"
                    className="m-2"
                    onClick={() =>
                        setAction(EmployeeOptionsEnum.BankManagement)
                    }
                />
                <Button
                    label="Dependientes"
                    icon="pi pi-users"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Dependant)}
                />
                <Button
                    label="Seguros"
                    icon="pi pi-search"
                    className="m-2"
                    onClick={() =>
                        setAction(EmployeeOptionsEnum.PersonInsurance)
                    }
                />
                <Button
                    label="Herramientas"
                    icon="pi pi-briefcase"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Tools)}
                />
                <Button
                    label="Desvincular"
                    icon="pi pi-user-minus"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.FireEmployee)}
                />
            </Fieldset>

            <Fieldset legend="Compensaciones" toggleable className="mb-5">
                <Button
                    label="Beneficios"
                    icon="pi pi-search"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Benefit)}
                />
                <Button
                    label="Deducciones"
                    icon="pi pi-search"
                    className="m-2"
                />
                <Button label="Prestamos" icon="pi pi-search" className="m-2" />
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

            <Fieldset legend="Absentismos" toggleable className="mb-5">
                <Button label="Licencias" icon="pi pi-search" className="m-2" />
                <Button label="Permisos" icon="pi pi-search" className="m-2" />
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
        </div>
    );
};

export default EmployeeOptions;
