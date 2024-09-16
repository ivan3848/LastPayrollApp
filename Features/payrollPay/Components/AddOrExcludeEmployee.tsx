import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons';
import { Chips } from 'primereact/chips';
import { Dialog } from 'primereact/dialog';
import React from 'react'
import { useForm } from 'react-hook-form';
import PayrollEmployeeTable from './PayrollEmployeeTable';

export interface IAddEmployee {
    employees: number[];
}

interface Props {
    setContent: (value: boolean) => void;
    content: boolean;
    handleAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    setSubmitted: (value: boolean) => void;
    setEmployees: (value: IAddEmployee) => void;
    employees: IAddEmployee | undefined;
    toast: React.MutableRefObject<any>;
}

const AddOrExcludeEmployee = ({
    setContent,
    content,
    toast,
    setSubmitted,
    setEmployees,
    employees,
}: Props) => {

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IAddEmployee>();

    const hideDialog = () => {
        setContent(false);
    };

    return (
        <Dialog
            visible={content}
            style={{ width: "50vw" }}
            header="Agregar Empleados"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <div className='card'>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12 lg:4">
                            <label htmlFor="employees">
                                <strong>
                                    Empleados
                                </strong>
                            </label>
                            <Chips
                                id="employees"
                                value={watch("employees")?.map(String) ?? []}
                                onChange={(e) => {
                                    setValue("employees", e.value!.map(Number))
                                    setEmployees({ employees: e.value!.map(Number) })
                                }}
                                keyfilter="int"
                                separator=' '
                            />
                        </div>
                    </div>
                </div>
                <PayrollEmployeeTable
                    employees={employees}
                    byPayroll={false}
                />
            </div>
            <DialogFooterButtons hideDialog={hideDialog} />
        </Dialog>
    )
}

export default AddOrExcludeEmployee
