import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { EmployeeOptionsEnum } from "../Enums/EmployeeOptionsEnum";
import { IEmployee } from "../Types/IEmployee";
import EmployeeOptions from "./EmployeeOptions";
import EmployeeProfile from "./EmployeeProfile";
import FireEmployee from "./FireEmployee";
import BankEmployeeHistory from "./BankEmployeeHistory/BankEmployeeHistory";
import ToolWorkDefinitionEmployee from "@/Features/toolWorkDefinitionEmployee/Components/ToolWorkDefinitionEmployee";
import Dependant from "./Dependant/Dependant";
import Profit from "./Benefit/Profit";
import PersonInsurance from "./PersonInsurance/PersonInsurance";
import CoverPosition from "@/Features/coverPosition/Components/CoverPosition";
import Deduction from "./Deduction/Deduction";
import License from "./Licenses/License";
import ISRInFavor from "./ISRInFavor/ISRInFavor";
import Permit from "./Permit/Permit";
import Vacation from "./Vacation/Vacation";
import WorkSchedulerSubstitute from "./WorkSchedulerSubstitute/WorkSchedulerSubstitute";
import Commission from "./Commission/Commission";
import Lease from "./Lease/Lease";

interface Props {
    showEmployeeActions: boolean;
    setShowEmployeeActions: (value: boolean) => void;
    employee: IEmployee;
}

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
                        <FireEmployee employee={employee} />
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
                        <Profit id={employee.idEmployee!} />
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
                </div>
            </Dialog>
        </>
    );
};

export default EmployeeActions;
