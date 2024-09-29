import React from 'react'
import { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import * as XLSX from 'xlsx';

interface Props {
    entity: IContabilization[];
}


const FirstContabilizationTable = ({ entity }: Props) => {
    const [visibleColumns, setVisibleColumns] = useState<{ field: string, header: string }[]>([]);

    useEffect(() => {
        if (entity.length > 0) {
            const dynamicColumns = Object.keys(entity[0])
                .filter(key => key == 'costCenter' ||
                    key == 'accountNumber' ||
                    key == 'accountName' ||
                    key == 'idEmployee' ||
                    key == 'firstName' ||
                    key == 'firstLastName' ||
                    key == 'department' ||
                    key == 'concept' ||
                    key == 'debit' ||
                    key == 'credit'
                )
                .map(key => ({
                    field: key,
                    header: translateColumnName(key)
                }));
            setVisibleColumns(dynamicColumns);
        }
    }, [entity]);

    const translateColumnName = (columnName: string) => {
        const translations: { [key: string]: string } = {
            costCenter: 'Centro de Costo',
            accountNumber: 'Número de Cuenta',
            accountName: 'Nombre de Cuenta',
            firstName: 'Nombre',
            firstLastName: 'Apellido',
            department: 'Departamento',
            secondLastName: 'Segundo Apellido',
            payrollName: 'Nombre de Nómina',
            concept: 'Concepto',
            conceptCode: 'Código de Concepto',
            amount: 'Monto',
            totalPay: 'Total de Pago',
            totalPayEmployee: 'Total de Pago de Empleado',
            totalPayExpense: 'Total de Pago de Gasto',
            totalTax: 'Total de Impuesto',
            isMain: 'Es Principal',
            salary: 'Salario',
            debit: 'Débito',
            credit: 'Crédito',
            employeeStatus: 'Estado de Empleado',
            payrollArea: 'Área de Nómina',
            paymentMethod: 'Método de Pago',
            payrollNumber: 'Número de Nómina',
        };
        return translations[columnName] || columnName.charAt(0).toUpperCase() + columnName.slice(1);
    };

    const onColumnToggle = (event: any) => {
        const selectedColumns = event.value;
        const orderedSelectedColumns = visibleColumns.filter((col) =>
            selectedColumns.some((sCol: any) => sCol.field === col.field)
        );
        setVisibleColumns(orderedSelectedColumns);
    };

    const exportToExcel = () => {
        const translatedEntity = entity.map((item: any) => {
            const translatedItem: { [key: string]: any } = {};
            for (const key in item) {
                if (key == 'costCenter' ||
                    key == 'accountNumber' ||
                    key == 'accountName' ||
                    key == 'idEmployee' ||
                    key == 'firstName' ||
                    key == 'firstLastName' ||
                    key == 'department' ||
                    key == 'concept' ||
                    key == 'debit' ||
                    key == 'credit') {
                    translatedItem[translateColumnName(key)] = item[key];
                }
            }
            return translatedItem;
        });

        const worksheet = XLSX.utils.json_to_sheet(translatedEntity);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    const header = (
        <div className='flex justify-between gap-6'>
            <MultiSelect
                value={visibleColumns}
                options={visibleColumns}
                optionLabel="header"
                onChange={onColumnToggle}
                className="w-full sm:w-20rem"
                display="chip"
            />
            <Button
                className='w-20rem ml-4'
                label="Exportar a Excel"
                icon="pi pi-file-excel"
                raised severity="success"
                text
                onClick={exportToExcel}
            />
            {/* <Button label="Diferencias" icon="pi pi-wallet" onClick={() => setIsVisible(true)} /> */}
        </div>
    );

    return (
        <div className="card">
            <DataTable value={entity} header={header} tableStyle={{ minWidth: '50rem' }}>
                {visibleColumns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );
}

export default FirstContabilizationTable