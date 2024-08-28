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
                    icon="pi pi-shield"
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
                    icon="pi pi-money-bill"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Benefit)}
                />
                <Button
                    label="Deducciones"
                    icon="pi pi-wallet"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Deduction)}
                />
                <Button 
                    label="Prestamos" 
                    icon="pi pi-search" 
                    className="m-2" 
                    onClick={() => setAction(EmployeeOptionsEnum.Lease)}
                    />
                <Button
                    label="ISR A Favor"
                    icon="pi pi-sparkles"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.ISRInFavor)}
                />
                <Button
                    label="Comisiones"
                    icon="pi pi-search"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Commission)}
                />
            </Fieldset>

            <Fieldset legend="Absentismos" toggleable className="mb-5">
                <Button
                    label="Licencias"
                    icon="pi pi-file-edit"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.License)}
                />
                <Button
                    label="Permisos"
                    icon="pi pi-sign-out"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Permit)}
                />
                <Button
                    label="Horas Extras"
                    icon="pi pi-hourglass"
                    className="m-2"
                />
                <Button
                    label="Plan De Horario"
                    icon="pi pi-calendar-times"
                    className="m-2"
                />
                <Button
                    label="Vacaciones"
                    icon="pi pi-sun"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.Vacation)}
                />
                <Button
                    label="Suplencias"
                    icon="pi pi-arrow-right-arrow-left"
                    className="m-2"
                    onClick={() => setAction(EmployeeOptionsEnum.WorkSchedulerSubstitute)}
                />
            </Fieldset>
        </div>
    );
};

export default EmployeeOptions;
