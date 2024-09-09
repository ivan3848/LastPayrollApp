import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { SelectButton } from "primereact/selectbutton";

interface AddCommissionArchiveValidationProps {
    isCommissionPayrollDialogVisible: boolean;
    setIsCommissionPayrollDialogVisible: (visible: boolean) => void;
}

const AddCommissionArchiveValidation: React.FC<
    AddCommissionArchiveValidationProps
> = ({
    isCommissionPayrollDialogVisible,
    setIsCommissionPayrollDialogVisible,
}) => {
    const [isCommissionPayroll, setIsCommissionPayroll] = useState<
        boolean | null
    >(null);

    const handleSave = () => {
        setIsCommissionPayrollDialogVisible(false);
    };

    return (
        <Dialog
            header="Select Commission Payroll Option"
            visible={isCommissionPayrollDialogVisible}
            style={{ width: "350px" }}
            footer={
                <div>
                    <Button
                        label="Cancel"
                        icon="pi pi-times"
                        onClick={() =>
                            setIsCommissionPayrollDialogVisible(false)
                        }
                        className="p-button-text border"
                    />
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleSave}
                        autoFocus
                    />
                </div>
            }
            onHide={() => setIsCommissionPayrollDialogVisible(false)}
        >
            <div className="field-radiobutton">
                <RadioButton
                    inputId="isCommissionPayrollTrue"
                    name="isCommissionPayroll"
                    value={true}
                    onChange={(e) => setIsCommissionPayroll(e.value)}
                    checked={isCommissionPayroll === true}
                />
                <label htmlFor="isCommissionPayrollTrue">True</label>
            </div>
            <div className="field-radiobutton">
                <RadioButton
                    inputId="isCommissionPayrollFalse"
                    name="isCommissionPayroll"
                    value={false}
                    onChange={(e) => setIsCommissionPayroll(e.value)}
                    checked={isCommissionPayroll === false}
                />
                <label htmlFor="isCommissionPayrollFalse">False</label>
            </div>
        </Dialog>
    );
};

export default AddCommissionArchiveValidation;
