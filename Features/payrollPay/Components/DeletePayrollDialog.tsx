import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons';
import { Chips } from 'primereact/chips';
import { Dialog } from 'primereact/dialog';
import React from 'react'
import { useForm } from 'react-hook-form';
import PayrollEmployeeTable from './PayrollEmployeeTable';
import { InputSwitch } from 'primereact/inputswitch';
import GenericDropDown from '@/Features/Shared/Components/GenericDropDown';
import usePayrollPayQuery from '../Hook/usePayrollPayQuery';
import useDeletePayrollPay from '../Hook/useDeletePayrollPay';
import DialogFooterButtonDeletePayrollPay from './DialogFooterButtonDeletePayrollPay';

export interface IAddEmployee {
    employees: number[];
}

export interface IDeletePayrollPayDto {
    idPayrollPay: number;
    employeeCodes?: number[];
    ToRemove: boolean;
}

interface Props {
    setIsVisible: (value: boolean) => void;
    isVisible: boolean;
    handleAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    setSubmitted: (value: boolean) => void;
    setEmployees: (value: IAddEmployee) => void;
    employees: IAddEmployee | undefined;
    toast: React.MutableRefObject<any>;
}

const DeletePayrollDialog = ({
    setIsVisible,
    isVisible,
    toast,
    setSubmitted,
    setEmployees,
    employees,
}: Props) => {

    const [byPayroll, setByPayroll] = React.useState(false);

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IDeletePayrollPayDto>();

    const deleteEntity = useDeletePayrollPay({
        toast,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IDeletePayrollPayDto) => {
        data.employeeCodes = employees?.employees.map((e: number) => e) ?? [];
        data.ToRemove = byPayroll;
        // deleteEntity.mutate(data);
        console.log(data);
        hideDialog();
    };

    const hideDialog = () => {
        setIsVisible(false);
    };

    return (
        <Dialog
            visible={isVisible}
            style={{ width: "50vw" }}
            header="Eliminar nómina"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='card'>
                    <div className="col-12">
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-5 mr-3">
                                <h6>Nómina</h6>
                                <GenericDropDown
                                    id="idPayrollPay"
                                    isValid={!!errors.idPayrollPay}
                                    text="payrollName"
                                    useQuery={usePayrollPayQuery}
                                    setValue={setValue}
                                    watch={watch}
                                />
                            </div>
                            <div className="field col-12 md:col-2">
                                <h6>Por empleado</h6>
                                <InputSwitch
                                    name="ByEmployee"
                                    checked={byPayroll}
                                    onChange={(e) =>
                                        setByPayroll(e.value ?? false)
                                    }
                                />
                            </div>
                            {byPayroll &&
                                <div className="field col-12 md:col-12 lg:4">
                                    <label htmlFor="employees">
                                        <strong>
                                            Empleados
                                        </strong>
                                    </label>
                                    <Chips
                                        id="employees"
                                        value={watch("employeeCodes")?.map(String) ?? []}
                                        onChange={(e) => {
                                            setValue("employeeCodes", e.value!.map(Number))
                                            setEmployees({ employees: e.value!.map(Number) })
                                        }}
                                        keyfilter="int"
                                        separator=' '
                                        disabled={!byPayroll}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    {byPayroll &&
                        <PayrollEmployeeTable
                            employees={employees}
                            byPayroll={byPayroll}
                        />}
                </div>
                <DialogFooterButtonDeletePayrollPay hideDialog={hideDialog} />
            </form>
        </Dialog>
    )
}

export default DeletePayrollDialog
