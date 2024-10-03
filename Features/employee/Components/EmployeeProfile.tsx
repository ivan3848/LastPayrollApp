import emptyImage from "@/constants/emptyImage";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { IEmployee } from "../Types/IEmployee";
import DeleteEmploye from "./DeleteEmployee/Components/DeleteEmploye";
import ReactivateEmployee from "./DeleteEmployee/Components/ReactivateEmployee";
import React from "react";

interface Props {
    employee: IEmployee;
    setShowEmployeeActions: (value: boolean) => void;
    reactivateEmployee: boolean;
}

const EmployeeProfile = ({ employee, setShowEmployeeActions }: Props) => {
    const { setDeleteEntityDialog, deleteEntityDialog, setSubmitted, toast } =
        useCrudModals<IEmployee>();

    const [reactivateEntityDialog, setReactivateEntity] = useState(false);
    const [deactivateEntityDialog, setDeactivateEntityDialog] = useState(false);
    const getSeverity = (employee: IEmployee) => {
        switch (employee.isActive) {
            case false:
                return "danger";

            default:
                return "success";
        }
    };

    return (
        <Fieldset legend="Perfil" className="text-xl">
            <div className="col-12" key={employee.idEmployee}>
                <div
                    className={classNames(
                        "flex flex-column xl:flex-row xl:align-items-start gap-4"
                    )}
                >
                    <div className="flex-row">
                        <img
                            className="sm:w-16rem xl:w-9rem shadow-2 xl:block mx-auto border-circle mb-2"
                            src={`${employee.employeeImage ?? emptyImage}`}
                            alt={employee.employeeName!}
                        />
                        <div className="text-2xl font-bold text-900 text-center">
                            {employee.idEmployee} - {employee.employeeName}
                        </div>
                    </div>

                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-2">
                            <Tag
                                value={
                                    employee.isActive ? "Activo" : "Inactivo"
                                }
                                severity={getSeverity(employee)}
                            ></Tag>

                            <div className="flex text-xl align-items-center gap-2">
                                <i className="pi pi-id-card"></i>
                                <p>{employee.identification}</p>
                            </div>
                            <div className="flex text-xl align-items-center gap-2">
                                <i className="pi pi-link"></i>
                                <p>{employee.position}</p>
                            </div>
                            <div className="flex text-xl align-items-center gap-2">
                                <i className="pi pi-warehouse"></i>
                                <p>{employee.department}</p>
                            </div>
                            <div className="flex text-xl align-items-center gap-2">
                                <i className="pi pi-calendar-clock"></i>
                                <p>
                                    {new Date(
                                        employee.startDate
                                    ).toLocaleDateString("es-DO")}
                                </p>
                            </div>
                        </div>
                        <div className="flex sm:flex-row align-items-center my-auto sm:align-items-center gap-3 sm:gap-2">
                            <Toast ref={toast} />
                            {employee.isActive && (
                                <>
                                    <>
                                        <Button
                                            label="Eliminar"
                                            onClick={() =>
                                                setDeleteEntityDialog(true)
                                            }
                                            className="p-button-danger"
                                        />
                                        <DeleteEmploye
                                            key={`delete-${employee.idEmployee}`}
                                            id={employee.idEmployee}
                                            endpoint="employee/employee/byidemployee"
                                            deleteEntityDialog={
                                                deleteEntityDialog
                                            }
                                            setSubmitted={setSubmitted}
                                            setDeleteEntityDialog={
                                                setDeleteEntityDialog
                                            }
                                            toast={toast}
                                            confirmDialogText={
                                                "Seguro que desea eliminar el empleado"
                                            }
                                            summary={"Eliminado!"}
                                            detail={
                                                "Empleado eliminado correctamente"
                                            }
                                            header="Eliminar Empleado"
                                        />
                                    </>

                                    <Button
                                        label="Desactivar"
                                        onClick={() =>
                                            setDeactivateEntityDialog(true)
                                        }
                                        className="p-button-warning"
                                    />
                                    <DeleteEmploye
                                        key={`deactivate-${employee.idEmployee}`}
                                        id={employee.idEmployee}
                                        endpoint="employee/employee/deactivate"
                                        deleteEntityDialog={
                                            deactivateEntityDialog
                                        }
                                        setSubmitted={setSubmitted}
                                        setDeleteEntityDialog={
                                            setDeactivateEntityDialog
                                        }
                                        toast={toast}
                                        header="Desactivar Empleado"
                                        confirmDialogText={
                                            "Seguro que desea desactivar el empleado"
                                        }
                                        summary={"Desactivación!"}
                                        detail={
                                            "Empleado desactivado correctamente"
                                        }
                                    />
                                </>
                            )}
                            {!employee.isActive && (
                                <>
                                    <Button
                                        label="Activar"
                                        onClick={() =>
                                            setReactivateEntity(true)
                                        }
                                        className="p-button-success"
                                    />
                                    <ReactivateEmployee
                                        id={employee.idEmployee}
                                        endpoint="employee/employee/reactivateEmployee"
                                        reactivateEntityDialog={
                                            reactivateEntityDialog
                                        }
                                        setSubmitted={setShowEmployeeActions}
                                        setReactivateEntityDialog={
                                            setReactivateEntity
                                        }
                                        toast={toast}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fieldset>
    );
};

export default EmployeeProfile;
