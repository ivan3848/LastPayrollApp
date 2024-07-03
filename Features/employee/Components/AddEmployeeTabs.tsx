"use client";

import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import { useState } from "react";
import AddPerson from "./../../person/Components/AddPerson";
import { IPerson } from "@/Features/person/Types/IPerson";

const AddEmployeeTabs = () => {
    const [step, setStep] = useState<number>(0);
    const [person, setPerson] = useState<IPerson>();
    const [employee, setEmployee] = useState<IEmployee>();
    const items: MenuItem[] = [
        {
            label: "Información Personal",
        },
        {
            label: "Información Del Empleado",
        },
        {
            label: "Payment",
        },
        {
            label: "Confirmation",
        },
    ];

    return (
        <div className="col-12">
            <h3>Agregar Empleado</h3>
            <div className="card">
                <Steps
                    model={items}
                    activeIndex={step}
                    onSelect={(e) => setStep(e.index)}
                    readOnly={false}
                    className="mb-6"
                />
                {step === 0 && <AddPerson setStep={setStep} setPerson={setPerson}/>}
                {step === 1 && <div>INFORMACIÓN DEL EMPLEADO</div>}
            </div>
        </div>
    );
};

export default AddEmployeeTabs;
