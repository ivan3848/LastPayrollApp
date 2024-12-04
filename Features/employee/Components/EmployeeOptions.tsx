import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import React, { useEffect, useState } from "react";
import { EmployeeOptionsEnum } from "../Enums/EmployeeOptionsEnum";
import { sessionCheck } from "@/app/(full-page)/auth/login/LoginServerActions";
import IRolModule from "@/Features/rolModule/Types/IRolModule";

interface Props {
    setAction: (action: EmployeeOptionsEnum) => void;
    onSubmit?: () => void;
}

const EmployeeOptions = ({ setAction }: Props) => {
    const [module, setModule] = useState<IRolModule[] | null>(null);

    useEffect(() => {
        sessionCheck().then((res) => {
            setModule(res!.rolModule ?? [""]);
        });
    }, []);

    const hasModuleAccess = (moduleName: any) =>
        module?.some((mod) => mod.module === moduleName);

    return (
        <div>
            <Fieldset legend="Funciones" toggleable className="mb-5">
                {hasModuleAccess("GESTION_BANCARIA") && (
                    <Button
                        label="Gestión Bancaria"
                        icon="pi pi-building-columns"
                        className="m-2"
                        onClick={() =>
                            setAction(EmployeeOptionsEnum.BankManagement)
                        }
                    />
                )}
                {hasModuleAccess("DEPENDIENTES") && (
                    <Button
                        label="Dependientes"
                        icon="pi pi-users"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.Dependant)}
                    />
                )}
                {hasModuleAccess("SEGUROS") && (
                    <Button
                        label="SEGUROS"
                        icon="pi pi-shield"
                        className="m-2"
                        onClick={() =>
                            setAction(EmployeeOptionsEnum.PersonInsurance)
                        }
                    />
                )}
                {hasModuleAccess("HERRAMIENTAS") && (
                    <Button
                        label="Herramientas"
                        icon="pi pi-briefcase"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.Tools)}
                    />
                )}
                {hasModuleAccess("DESVINCULAR") && (
                    <Button
                        label="Desvincular"
                        icon="pi pi-user-minus"
                        className="m-2"
                        onClick={() =>
                            setAction(EmployeeOptionsEnum.FireEmployee)
                        }
                    />
                )}
            </Fieldset>

            <Fieldset legend="Compensaciones" toggleable className="mb-5">
                {hasModuleAccess("BENEFICIOS") && (
                    <Button
                        label="Beneficios"
                        icon="pi pi-money-bill"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.Benefit)}
                    />
                )}
                {hasModuleAccess("DEDUCCIONES") && (
                    <Button
                        label="Deducciones"
                        icon="pi pi-wallet"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.Deduction)}
                    />
                )}
                {hasModuleAccess("PRESTAMO") && (
                    <Button
                        label="Prestamos"
                        icon="pi pi-money-bill"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.Lease)}
                    />
                )}
                {hasModuleAccess("ISR_A_FAVOR") && (
                    <Button
                        label="ISR A Favor"
                        icon="pi pi-sparkles"
                        className="m-2"
                        onClick={() =>
                            setAction(EmployeeOptionsEnum.ISRInFavor)
                        }
                    />
                )}
                {/* {hasModuleAccess("COMISIONES") && (
                    <Button
                        label="Comisiones"
                        icon="pi pi-wallet"
                        className="m-2"
                        onClick={() =>
                            setAction(EmployeeOptionsEnum.Commission)
                        }
                    />
                )} */}
            </Fieldset>

            <Fieldset legend="Absentismos" toggleable className="mb-5">
                {hasModuleAccess("LICENCIA") && (
                    <Button
                        label="Licencias"
                        icon="pi pi-file-edit"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.License)}
                    />
                )}
                {hasModuleAccess("PERMISOS") && (
                    <Button
                        label="Permisos"
                        icon="pi pi-sign-out"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.Permit)}
                    />
                )}
                {hasModuleAccess("HORAS_EXTRAS") && (
                    <Button
                        label="Horas Extras"
                        icon="pi pi-hourglass"
                        className="m-2"
                        onClick={() =>
                            setAction(EmployeeOptionsEnum.ExtraHourLateness)
                        }
                    />
                )}
                {hasModuleAccess("VACACIONES") && (
                    <Button
                        label="Vacaciones"
                        icon="pi pi-sun"
                        className="m-2"
                        onClick={() => setAction(EmployeeOptionsEnum.Vacation)}
                    />
                )}
                {hasModuleAccess("SUPLENCIAS") && (
                    <Button
                        label="Suplencias"
                        icon="pi pi-arrow-right-arrow-left"
                        className="m-2"
                        onClick={() =>
                            setAction(EmployeeOptionsEnum.CoverPosition)
                        }
                    />
                )}
            </Fieldset>
        </div>
    );
};

export default EmployeeOptions;
