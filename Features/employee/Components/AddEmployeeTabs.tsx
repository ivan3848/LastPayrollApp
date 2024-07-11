"use client";

import { IPerson } from "@/Features/person/Types/IPerson";
import { useMutation } from "@tanstack/react-query";
import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import AddPerson from "./../../person/Components/AddPerson";
import personService from "@/Features/person/Services/personService";
import EmergencyEmployeeContact from "./EmergencyEmployeeContact";
import AddEmployee from "./AddEmployee";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import employeeService from "../Services/employeeService";
import ApiService from "@/services/ApiService";

const AddEmployeeTabs = () => {
    const [step, setStep] = useState<number>(0);
    const [person, setPerson] = useState<IPerson>();
    const [employee, setEmployee] = useState<IEmployee>();
    const toast = useRef(null);

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

    const addPerson = useAddEntityQuery({
        toast,
        service: personService,
        setEntity: setPerson,
    });

    const addEmployee = useAddEntityQuery<IEmployee>({
        toast,
        service: employeeService as ApiService<IEmployee, IEmployee>,
        setEntity: setEmployee,
    });

    const addEmployeeInformation = async () => {
        await addPerson.mutate(person!);
        console.log(person);

        const updatedEmployee = {
            ...employee!, // Ensure prevEmployee is accessible here, might need to adjust scope
            idPerson: person!.idPerson,
        };

        console.log(updatedEmployee);
        await addEmployee.mutate(updatedEmployee!);

        setEmployee(() => employee);
    };

    return (
        <div className="col-12">
            <h3>Agregar Empleado</h3>
            <Toast ref={toast} />

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
                    />
                )}
                {step === 2 && (
                    <EmergencyEmployeeContact
                        // employee={employee}
                        setContactInformation={setContactInformation}
                        addEmployeeInformation={addEmployeeInformation}
                    />
                )}
            </div>
        </div>
    );
};

export default AddEmployeeTabs;
