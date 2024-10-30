"use client";

import { CACHE_KEY_EMPLOYEE, CACHE_KEY_POSITION } from "@/constants/cacheKeys";
import AddHierarchyPosition from "@/Features/hierarchyPosition/Components/AddHierarchyPosition";
import { IHierarchyPosition } from "@/Features/hierarchyPosition/Types/IHierarchyPosition";
import { IPerson } from "@/Features/person/Types/IPerson";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { useRouter } from "next/navigation";
import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import AddPerson from "../../../person/Components/AddPerson";
import { addEmployeeService } from "../../Services/employeeService";
import { IEmployee } from "../../Types/IEmployee";
import { IInsertEmployee } from "../../Types/IInsertEmployee";
import AddEmployee from "./AddEmployee";

interface personFormRef {
    submitPersonForm: () => void;
}

const AddEmployeeTabs = () => {
    const [step, setStep] = useState<number>(0);
    const [person, setPerson] = useState<IPerson>();
    const [employee, setEmployee] = useState<IEmployee>();
    const expireQuery = useExpireSessionQuery([
        CACHE_KEY_POSITION,
        CACHE_KEY_EMPLOYEE,
    ]);

    const { addEntityDialog, setAddEntityDialog, setSubmitted, toast } =
        useCrudModals<IHierarchyPosition>();

    const addPersonRef = useRef<personFormRef>(null);

    const router = useRouter();

    const items: MenuItem[] = [
        {
            label: "Información Personal",
        },
        {
            label: "Información del Empleado",
            disabled: !!!person?.identification,
        },
    ];

    const addEmployee = useAddEntityQuery<IInsertEmployee>({
        toast,
        service: addEmployeeService,
        setEntity: setEmployee,
    });

    const addEmployeeInformation = (updatedEmployee: IEmployee) => {
        const employeeToAdd = {
            ...updatedEmployee,
            person: {
                ...person!,
            },
        } as IInsertEmployee;

        validateAddDataForm();
        addEmployee.mutateAsync(employeeToAdd).then(() => {
            expireQuery();
            router.push("/employee");
        });
    };

    const validateAddDataForm = () => {
        if (addPersonRef.current) {
            addPersonRef.current.submitPersonForm();
        }
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
                <div style={{ display: step === 0 ? "block" : "none" }}>
                    <AddPerson
                        setStep={setStep}
                        setPerson={setPerson}
                        person={person}
                        ref={addPersonRef}
                    />
                </div>

                <div style={{ display: step === 1 ? "block" : "none" }}>
                    <AddEmployee
                        employee={employee}
                        handleAdd={handleAdd}
                        toast={toast}
                        addEmployeeInformation={addEmployeeInformation}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeTabs;
