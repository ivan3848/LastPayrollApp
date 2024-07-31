"use client";

import AddHierarchyPosition from "@/Features/hierarchyPosition/Components/AddHierarchyPosition";
import { IHierarchyPosition } from "@/Features/hierarchyPosition/Types/IHierarchyPosition";
import { IPerson } from "@/Features/person/Types/IPerson";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { useState } from "react";
import { addEmployeeService } from "../Services/employeeService";
import { IInsertEmployee } from "../Types/IInsertEmployee";
import AddPerson from "./../../person/Components/AddPerson";
import AddEmployee from "./AddEmployee";
import EmergencyEmployeeContact from "./EmergencyEmployeeContact";
import { IEmployee } from "../Types/IEmployee";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { CACHE_KEY_EMPLOYEE, CACHE_KEY_POSITION } from "@/constants/cacheKeys";

const AddEmployeeTabs = () => {
    const [step, setStep] = useState<number>(0);
    const [person, setPerson] = useState<IPerson>();
    const [employee, setEmployee] = useState<IEmployee>();
    const expireQuery = useExpireSessionQuery([CACHE_KEY_POSITION, CACHE_KEY_EMPLOYEE]);

    const { addEntityDialog, setAddEntityDialog, setSubmitted, toast } =
        useCrudModals<IHierarchyPosition>();

    const setContactInformation = (
        idStatusRelationship?: number,
        contactName?: string,
        contactNumber?: string
    ) => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee!,
            idStatusRelationship,
            contactName,
            contactNumber,
        }));
    };

    const items: MenuItem[] = [
        {
            label: "Información Personal",
        },
        {
            label: "Información Del Empleado",
            disabled: !!!person?.identification,
        },
        {
            label: "Contacto De Emergencias",
            disabled: !!!employee?.idEmployee,
        },
    ];

    const addEmployee = useAddEntityQuery<IInsertEmployee>({
        toast,
        service: addEmployeeService,
        setEntity: setEmployee,
    });

    const AddEmployeeInformation = () => {
        const employeeToAdd = {
            ...employee!,
            person: {
                ...person!,
            },
        } as IInsertEmployee;

        addEmployee.mutateAsync(employeeToAdd).then(() => expireQuery());
    };

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    return (
        <div className="col-12">
            <h3>Agregar Empleado</h3>
            <Toast ref={toast} />

            {addEntityDialog && (
                <AddHierarchyPosition
                    addEntityDialog={addEntityDialog}
                    setAddEntityDialog={setAddEntityDialog}
                    setSubmitted={setSubmitted}
                    toast={toast}
                />
            )}

            <div className="card">
                <Steps
                    model={items}
                    activeIndex={step}
                    onSelect={(e) => setStep(e.index)}
                    readOnly={false}
                    className="mb-6"
                />
                {step === 0 && (
                    <AddPerson
                        setStep={setStep}
                        setPerson={setPerson}
                        person={person}
                    />
                )}

                {step === 1 && (
                    <AddEmployee
                        setStep={setStep}
                        setEmployee={setEmployee}
                        employee={employee}
                        handleAdd={handleAdd}
                        toast={toast}
                    />
                )}

                {step === 2 && (
                    <EmergencyEmployeeContact
                        employee={employee}
                        setContactInformation={setContactInformation}
                        addEmployeeInformation={AddEmployeeInformation}
                    />
                )}
            </div>
        </div>
    );
};

export default AddEmployeeTabs;
