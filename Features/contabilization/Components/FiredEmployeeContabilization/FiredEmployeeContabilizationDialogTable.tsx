'use client';
import { IFiredEmployeeContabilization } from '@/Features/employee/Components/FiredEmployee/Types/IFiredEmployee';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';


interface Props {
    entity: IFiredEmployeeContabilization[];
}

const FiredEmployeeContabilizationTable = ({ entity }: Props) => {
    const [visibleColumns, setVisibleColumns] = useState<{ field: string, header: string }[]>([]);

    useEffect(() => {
        if (entity.length > 0) {
            const dynamicColumns = Object.keys(entity[0])
                .filter(key =>
                    key == 'costCenterAccount' ||
                    key == 'accountName' ||
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
            costCenterAccount: 'Número de Cuenta',
            accountName: 'Nombre de Cuenta',
        };
        return translations[columnName] || columnName.charAt(0).toUpperCase() + columnName.slice(1);
    };

    const exportToExcel = () => {
        const translatedEntity = entity.map((item: any) => {
            const translatedItem: { [key: string]: any } = {};
            for (const key in item) {
                if (key == 'accountNumber' ||
                    key == 'accountName' ||
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
            <Button
                className='w-20rem ml-4'
                label="Exportar a Excel"
                icon="pi pi-file-excel"
                raised severity="success"
                text
                onClick={exportToExcel}
            />
        </div>
    );

    return (
        <div className="card">
            <DataTable value={entity} header={header} tableStyle={{ minWidth: '50rem' }}>
                {visibleColumns.map((col) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
                <Column
                    footer={() => {
                        const totalDebit = entity.reduce((sum, item) => sum + (item.amount || 0), 0);
                        const totalCredit = entity.reduce((sum, item) => sum + (item.amount || 0), 0);
                        return (
                            <div>
                                <div>Total Débito: {totalDebit}</div>
                                <div>Total Crédito: {totalCredit}</div>
                            </div>
                        );
                    }}
                />
            </DataTable>
        </div>
    );
}


export default FiredEmployeeContabilizationTable