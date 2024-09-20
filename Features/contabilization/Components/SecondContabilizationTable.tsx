import useParamFilter from '@/Features/Shared/Hooks/useParamFilter';
import { Column } from 'primereact/column';
import { DataTable, DataTableSortEvent } from 'primereact/datatable';
import React from 'react'

interface Props {
    entity: IPayrollPayResume[];
    index?: number;
}

const SecondContabilizationTable = ({ entity, index }: Props) => {

    const {
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
    };

    const onSort = (event: DataTableSortEvent) => {
        switch (event.sortOrder) {
            case 1:
                setSorts([{ sortBy: event.sortField, isAsc: true }]);
                break;
            case -1:
                setSorts([{ sortBy: event.sortField, isAsc: false }]);
                break;
            default:
                clearSorts();
                break;
        }
    };

    const formatMoney = (value: number) => {
        return `RD$${value}`;
    };

    return (
        <DataTable
            value={entity}
            className="p-datatable-sm"
            dataKey="idPayrollPayResume"
            style={{ width: "100%", height: "100%" }}
            paginator
            onSort={onSort}
            removableSort
            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
            sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
            sortMode="single"
            rows={5}
            rowsPerPageOptions={[5, 10, 15]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        >
            <Column
                field="idEmployee"
                header="ID Empleado"
                sortable
                filter
                filterField="idEmployee"
                filterPlaceholder="Buscar por nombre"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                key="salary"
                field="salary"
                header="Salario"
                body={(rowData: IPayrollPayResume) => formatMoney(rowData.totalPay ?? 0)}
            />
            <Column
                key="totalProfit"
                field="totalProfit"
                header="Total de Ingresos"
                body={(rowData: IPayrollPayResume) => formatMoney(rowData.totalPay ?? 0)}
            />
            <Column
                key="totalDeduction"
                field="totalDeduction"
                header="Total de Deducciones"
                body={(rowData: IPayrollPayResume) => formatMoney(rowData.totalPay ?? 0)}
            />
            <Column
                key="totalPay"
                field="totalPay"
                header={index == 1 ? "Pendiente por reducir" : "Total a pagar"}
                body={(rowData: IPayrollPayResume) => formatMoney(rowData.totalPay ?? 0)}
            />
        </DataTable>
    )
}

export default SecondContabilizationTable