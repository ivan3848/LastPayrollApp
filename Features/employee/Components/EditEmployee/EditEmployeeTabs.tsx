"use client";

import { CACHE_KEY_EMPLOYEE, CACHE_KEY_POSITION } from "@/constants/cacheKeys";
import AddHierarchyPosition from "@/Features/hierarchyPosition/Components/AddHierarchyPosition";
import { IHierarchyPosition } from "@/Features/hierarchyPosition/Types/IHierarchyPosition";
import EditPerson from "@/Features/person/Components/EditPerson";
import { IPerson } from "@/Features/person/Types/IPerson";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { useRouter, useSearchParams } from "next/navigation";
import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import employeeService, {
    addEmployeeService,
} from "../../Services/employeeService";
import { IEmployee } from "../../Types/IEmployee";
import { IInsertEmployee } from "../../Types/IInsertEmployee";
import AddEmployee from "./EditEmployee";
import EmergencyEmployeeContact from "./EmergencyEmployeeContact";
import EditEmployee from "./EditEmployee";

interface personFormRef {
    submitPersonForm: () => void;
}
interface employeeFormRef {
    submitEmployeeForm: () => void;
}

const EditEmployeeTabs = () => {
    const [step, setStep] = useState<number>(0);
    const [person, setPerson] = useState<IPerson>();
    const [employee, setEmployee] = useState<IEmployee>();
    const addPersonRef = useRef<personFormRef>(null);
    const addEmployeeRef = useRef<employeeFormRef>(null);

    const expireQuery = useExpireSessionQuery([
        CACHE_KEY_POSITION,
        CACHE_KEY_EMPLOYEE,
    ]);

    const { addEntityDialog, setAddEntityDialog, setSubmitted, toast } =
        useCrudModals<IHierarchyPosition>();

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (id) {
            employeeService.getById(+id).then((data) => {
                setEmployee(data);
            });
        }
    }, [id]);

    const items: MenuItem[] = [
        {
            label: "Información Personal",
        },
        {
            label: "Información Del Empleado",
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

        validateAddPersonForm();
        addEmployee.mutateAsync(employeeToAdd).then(() => {
            expireQuery();
            router.push("/employee");
        });
    };

    const validateAddPersonForm = () => {
        if (addPersonRef.current) {
            addPersonRef.current.submitPersonForm();
        }
        if (addEmployeeRef.current) {
            addEmployeeRef.current.submitEmployeeForm();
        }
    };

    return (
        <div className="col-12">
            <h3>Editar Empleado</h3>
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
                    <EditPerson person={employee?.person} toast={toast} />
                </div>

                <div style={{ display: step === 1 ? "block" : "none" }}>
                    <EditEmployee employee={employee} toast={toast} />
                </div>
            </div>
        </div>
    );
};

export default EditEmployeeTabs;
