import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { EmployeeOptionsEnum } from "../Enums/EmployeeOptionsEnum";
import { IEmployee } from "../Types/IEmployee";
import EmployeeOptions from "./EmployeeOptions";
import EmployeeProfile from "./EmployeeProfile";
import FireEmployee from "./FireEmployee";
import BankEmployeeHistory from "./BankEmployeeHistory/BankEmployeeHistory";

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
                    <EmployeeProfile employee={employee} />
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
                    {openAction === EmployeeOptionsEnum.Tools && (
                        <BankEmployeeHistory id={employee.idEmployee!} />
                    )}
                </div>
            </Dialog>
        </>
    );
};

export default EmployeeActions;
