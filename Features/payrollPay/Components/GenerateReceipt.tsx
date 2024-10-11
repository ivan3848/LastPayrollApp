import { Chips } from 'primereact/chips';
import { Dialog } from 'primereact/dialog';
import React from 'react'
import { useForm } from 'react-hook-form';
import PayrollEmployeeTable from './PayrollEmployeeTable';
import GenericDropDown from '@/Features/Shared/Components/GenericDropDown';
import usePayrollPayQuery from '../Hook/usePayrollPayQuery';
import DialogFooterButtonDeletePayrollPay from './DialogFooterButtonDeletePayrollPay';
import useGenerateReceiptsQuery from '../Hook/useGenerateReceiptsQuery';
import { IGetPayrollExecution } from '../types/IGetPayrollExecution';
import InvoiceViewer from '@/Features/reports/components/InvoiceViewer';
import { createRoot } from 'react-dom/client';
import { Button } from 'primereact/button';

export interface IAddEmployee {
    employees: number[];
}

export interface IGenerateReceipt {
    idPayrollPay: number;
    employeeCodes?: number[];
}

interface Props {
    setIsVisible: (value: boolean) => void;
    isVisible: boolean;
    handleGenerateReceipt: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    setSubmitted: (value: boolean) => void;
    setEmployees: (value: IAddEmployee) => void;
    employees: IAddEmployee | undefined;
    toast: React.MutableRefObject<any>;
}

const GenerateReceiptDialog = ({
    setIsVisible,
    isVisible,
    toast,
    setSubmitted,
    setEmployees,
    employees,
}: Props) => {

    const {
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IGenerateReceipt>();

    const getReceipt = useGenerateReceiptsQuery({
        toast,
        setSubmitted,
        reset,
    });

    const onSubmit = async (data: IGenerateReceipt) => {
        data.employeeCodes = employees?.employees.map((e: number) => e) ?? [];

        const response = await getReceipt.mutateAsync(data) as IGetPayrollExecution[];
        executeReport(response);

        hideDialog();
        return;
    };

    const executeReport = (data: IGetPayrollExecution[]) => {
        if (data?.length) {
            const getPayrollExecutionWithoutIdentifier = data!.map(
                ({ identifier, ...rest }) => rest
            );

            const newTab = window.open("", "_blank");
            if (newTab) {
                newTab.document.write('<div id="invoice-viewer-root"></div>');
                newTab.document.close();

                const rootElement = newTab.document.getElementById(
                    "invoice-viewer-root"
                );
                if (rootElement) {
                    const root = createRoot(rootElement);
                    root.render(
                        <InvoiceViewer
                            data={getPayrollExecutionWithoutIdentifier}
                        />
                    );
                }
            }
        }
    };

    const hideDialog = () => {
        setIsVisible(false);
    };

    return (
        <Dialog
            visible={isVisible}
            style={{ width: "50vw" }}
            header="Comprobante de Pago"
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
                                />
                            </div>
                        </div>
                    </div>
                    <PayrollEmployeeTable
                        employees={employees}
                        byPayroll={false}
                    />
                </div>
                <div
                    className="flex justify-content-end mt-3"
                    style={{ width: "30%", gap: "5px", marginLeft: "auto" }}
                >
                    <Button
                        label="Cancelar"
                        icon="pi pi-times"
                        raised
                        type="button"
                        onClick={hideDialog}
                        severity="danger"
                    />
                    <Button
                        label="Generar"
                        icon="pi pi-check"
                        type="submit"
                        raised
                    />
                </div>
            </form>
        </Dialog>
    )
}

export default GenerateReceiptDialog
