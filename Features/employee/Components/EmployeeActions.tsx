import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { EmployeeOptionsEnum } from "../Enums/EmployeeOptionsEnum";
import { IEmployee } from "../Types/IEmployee";
import EmployeeOptions from "./EmployeeOptions";
import EmployeeProfile from "./EmployeeProfile";
import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

interface Props {
    showEmployeeActions: boolean;
    setShowEmployeeActions: (value: boolean) => void;
    employee: IEmployee;
}

const BankEmployeeHistory = dynamic(
    () => import("./BankEmployeeHistory/BankEmployeeHistory"),
    {
        loading: () => <Loading />,
    }
);

const FireEmployee = dynamic(
    () => import("./FiredEmployee/Components/FireEmployee"),
    {
        loading: () => <Loading />,
    }
);

const ToolWorkDefinitionEmployee = dynamic(
    () =>
        import(
            "@/Features/toolWorkDefinitionEmployee/Components/ToolWorkDefinitionEmployee"
        ),
    {
        loading: () => <Loading />,
    }
);

const Dependant = dynamic(() => import("./Dependant/Dependant"), {
    loading: () => <Loading />,
});

const Profit = dynamic(() => import("./Benefit/Profit"), {
    loading: () => <Loading />,
});

const PersonInsurance = dynamic(
    () => import("./PersonInsurance/PersonInsurance"),
    {
        loading: () => <Loading />,
    }
);

const CoverPosition = dynamic(
    () => import("@/Features/coverPosition/Components/CoverPosition"),
    {
        loading: () => <Loading />,
    }
);

const Deduction = dynamic(() => import("./Deduction/Deduction"), {
    loading: () => <Loading />,
});

const License = dynamic(() => import("./Licenses/License"), {
    loading: () => <Loading />,
});

const ISRInFavor = dynamic(() => import("./ISRInFavor/ISRInFavor"), {
    loading: () => <Loading />,
});

const Permit = dynamic(() => import("./Permit/Permit"), {
    loading: () => <Loading />,
});

const Vacation = dynamic(() => import("./Vacation/Vacation"), {
    loading: () => <Loading />,
});

const WorkSchedulerSubstitute = dynamic(
    () => import("./WorkSchedulerSubstitute/WorkSchedulerSubstitute"),
    {
        loading: () => <Loading />,
    }
);

const Commission = dynamic(() => import("./Commission/Commission"), {
    loading: () => <Loading />,
});

const Lease = dynamic(() => import("./Lease/Lease"), {
    loading: () => <Loading />,
});

const ExtraHourLateness = dynamic(
    () => import("./ExtraHourLateness/Components/ExtraHourLateness"),
    {
        loading: () => <Loading />,
    }
);

const EmployeeActions = ({
    showEmployeeActions,
    setShowEmployeeActions,
    employee,
}: Props) => {
    const [openAction, setOpenAction] = useState<EmployeeOptionsEnum>(
        EmployeeOptionsEnum.NoOption
    );

    const headerTitle = (
        <div className="inline-flex align-items-center justify-content-center gap-5">
            {openAction !== EmployeeOptionsEnum.NoOption && (
                <i
                    className="cursor-pointer pi pi-arrow-left"
                    onClick={() => setOpenAction(EmployeeOptionsEnum.NoOption)}
                ></i>
            )}
            <span className="font-bold white-space-nowrap">{openAction}</span>
        </div>
    );

    return (
        <>
            <Dialog
                visible={showEmployeeActions}
                onHide={() => setShowEmployeeActions(false)}
                dismissableMask
                draggable={false}
                maximizable
                resizable
                header={headerTitle}
                focusOnShow
                style={{ width: "80vw" }}
            >
                <div className="mb-5">
                    <EmployeeProfile
                        setShowEmployeeActions={setShowEmployeeActions}
                        employee={employee}
                    />
                </div>

                <div>
                    {openAction === EmployeeOptionsEnum.NoOption && (
                        <EmployeeOptions setAction={setOpenAction} />
                    )}
                    {openAction === EmployeeOptionsEnum.FireEmployee && (
                        <FireEmployee
                            employee={employee}
                            setCloseDialog={setShowEmployeeActions}
                        />
                    )}
                    {openAction === EmployeeOptionsEnum.BankManagement && (
                        <BankEmployeeHistory id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.Dependant && (
                        <Dependant id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.Tools && (
                        <ToolWorkDefinitionEmployee id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.Benefit && (
                        <Profit employee={employee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.PersonInsurance && (
                        <PersonInsurance employee={employee} />
                    )}
                    {openAction === EmployeeOptionsEnum.CoverPosition && (
                        <CoverPosition employee={employee} />
                    )}
                    {openAction === EmployeeOptionsEnum.Deduction && (
                        <Deduction id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.License && (
                        <License id={employee.idEmployee} />
                    )}
                    {openAction === EmployeeOptionsEnum.ISRInFavor && (
                        <ISRInFavor id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.Permit && (
                        <Permit id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.Vacation && (
                        <Vacation employeeEntity={employee} />
                    )}
                    {openAction ===
                        EmployeeOptionsEnum.WorkSchedulerSubstitute && (
                        <WorkSchedulerSubstitute id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.Commission && (
                        <Commission id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.Lease && (
                        <Lease id={employee.idEmployee!} />
                    )}
                    {openAction === EmployeeOptionsEnum.ExtraHourLateness && (
                        <ExtraHourLateness id={employee.idEmployee!} />
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default EmployeeActions;
