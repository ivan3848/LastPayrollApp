"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import { IAddEmployee } from "./AddOrExcludeEmployee";
import { employeesForPayrollPayService } from "../Services/payrollPayService";
import { useEffect, useState } from "react";
import { IEmployee } from "@/Features/employee/Types/IEmployee";

interface Props {
    submitted: boolean;
    employees?: IAddEmployee;
}

const PayrollEmployeeTable = ({ submitted, employees }: Props) => {

    const {
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const [list, setList] = useState<IEmployee[]>([]);


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

    useEffect(() => {
        const response = async () => {
            const response = await employeesForPayrollPayService.post(employees!.employees) as IEmployee[];
            setList(response);
        }
        employees && response();
    }, [submitted, employees]);

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
    };


    return (
        <Card className="m-2">
            <DataTable
                value={list ?? []}
                className="p-datatable-sm"
                dataKey="idEmployee"
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
                    filterField="doctorName"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="employeeName"
                    header="Nombre del Empleado"
                    sortable
                    filter
                    filterField="doctorName"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
            </DataTable>
        </Card>
    );
};

export default PayrollEmployeeTable;
