import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react'
import PayrollEmployeeTable from './PayrollEmployeeTable';
import { Chips } from 'primereact/chips';
import { useForm } from 'react-hook-form';
import useCrudModals from '@/Features/Shared/Hooks/useCrudModals';
import GenericDropDown from '@/Features/Shared/Components/GenericDropDown';
import { InputSwitch } from 'primereact/inputswitch';
import usePayrollPayQuery from '../Hook/usePayrollPayQuery';
import useGenerateFileQuery from '../Hook/useGenerateFileQuery';
import { IPaymentLoad } from '../types/IPayrollPay';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Props {
    setContent: (value: boolean) => void;
    content: boolean;
    setEmployees?: (value: any) => void;
    employees?: any;
    setViewEmployees?: (value: boolean) => void;
}

export interface IGetPaymentLoadsDto {
    idPayrollPay: number;
    employeeCodes?: number[];
}

const GenerateFiles = ({
    setContent,
    content,
    setEmployees,
    employees,
    setViewEmployees }: Props) => {

    const {
        toast,
        setSubmitted,
    } = useCrudModals();

    const [byPayroll, setByPayroll] = React.useState(false);
    const [fileType, setFileType] = React.useState(false);

    const {
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IGetPaymentLoadsDto>();

    const generateFiles = useGenerateFileQuery({
        toast,
        setSubmitted,
        reset,
    });

    const onSubmit = async (data: IGetPaymentLoadsDto) => {
        data.employeeCodes = employees?.employees.map((e: number) => e) ?? [];

        const response = await generateFiles.mutateAsync(data) as IPaymentLoad;

        if (fileType) {
            generateExcel(response);
        }
        else {
            generateFile(response as any);
        }
        hideDialog();
    };

    const generateExcel = async (response: string | IPaymentLoad) => {
        let data: IPaymentLoad;

        if (typeof response === 'string') {
            try {
                data = JSON.parse(response);
            } catch (error) {
                console.error('Invalid JSON string:', error);
                return;
            }
        } else {
            data = response;
        }

        const translatedData = translateData(data);

        const dataArray = Array.isArray(translatedData) ? translatedData : [translatedData];
        const worksheet = XLSX.utils.json_to_sheet(dataArray);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    const translateData = (entity: any) => {
        return entity.map((item: any) => {
            const translatedItem: { [key: string]: any } = {};
            for (const key in item) {
                if (['bankName', 'bankCode', 'paymentMethod', 'accountNumber', 'totalPay', 'employeeName', 'countryName', 'email', 'transactionType', 'documentType'].includes(key)) {
                    translatedItem[translateColumnName(key)] = item[key];
                }
            }
            return translatedItem;
        });
    };

    const translateColumnName = (columnName: string) => {
        const translations: { [key: string]: string } = {
            bankName: 'Nombre de Banco',
            bankCode: 'Código de Banco',
            paymentMethod: 'Método de Pago',
            accountNumber: 'Número de Cuenta',
            totalPay: 'Total de Pago',
            employeeName: 'Nombre de Empleado',
            countryName: 'Nombre de País',
            email: 'Correo Electrónico',
            transactionType: 'Tipo de Transacción',
            documentType: 'Tipo de Documento'
        };
        return translations[columnName] || columnName.charAt(0).toUpperCase() + columnName.slice(1);
    };

    const generateFile = (data: any) => {
        const content = Object.entries(data[0])
            .map(([key, value]) => `${key}: ${value ?? 'N/A'}`)
            .join('\n');
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, data.fileName || "payment_details.txt");
    };

    const hideDialog = () => {
        setContent(false);
    };

    return (
        <Dialog
            visible={content}
            style={{ width: "50vw" }}
            header="Descargar archivos"
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
                                            // setEmployees({ employees: e.value!.map(Number) })
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
                <div
                    className="flex justify-content-end mt-3"
                    style={{ width: "55%", gap: "5px", marginLeft: "auto" }}
                >
                    <Button
                        label="Descargar Excel"
                        icon="pi pi-file-excel"
                        severity="success"
                        type='submit'
                        onClick={() => setFileType(true)}
                        raised
                        text
                    />
                    <Button
                        label="Descargar TXT"
                        icon="pi pi-align-center"
                        severity="warning"
                        type='submit'
                        raised
                        text
                    />
                </div>
            </form>
        </Dialog>
    )
}

export default GenerateFiles