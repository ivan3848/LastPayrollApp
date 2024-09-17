"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import usePayrollPayQuery from "@/Features/payrollPay/Hook/usePayrollPayQuery";
import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";
import { Button } from "primereact/button";

interface Props {
    submitted: boolean;
    handleDetails: () => void;
}

const PayrollHistoryTable = ({
    submitted,
    handleDetails,
}: Props) => {
    const {
        setPage,
        setPageSize,
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const listOfDependencies: boolean[] = [submitted];

    const { data, isLoading } = usePayrollPayQuery(
        params,
        listOfDependencies,
    );

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("es-DO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
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

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const formatMoney = (value: number) => {
        return `RD$${value}`;
    };

    return (
        <Card className="m-2">
            <DataTable
                value={data.items}
                className="p-datatable-sm"
                dataKey="idPayrollPay"
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
                    field="payrollName"
                    header="Descripción"
                    sortable
                    filter
                    filterField="payrollName"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idPayrollArea"
                    header="Tipo de Nómina"
                    sortable
                    filter
                    filterField="idPayrollArea"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="PayrollPayDate"
                    header="Fecha de nómina"
                    body={(rowData: IPayrollPay) =>
                        formatDate(rowData.payrollPayDate?.toString()!)
                    }
                />
                <Column
                    field="startDate"
                    header="Fecha de inicio"
                    body={(rowData: IPayrollPay) =>
                        formatDate(rowData.startDate?.toString()!)
                    }
                />
                <Column
                    field="endDate"
                    header="Fecha Final"
                    body={(rowData: IPayrollPay) =>
                        formatDate(rowData.endDate?.toString()!)
                    }
                />
                <Column
                    key="totalPay"
                    field="totalPay"
                    header="Total pagado"
                    body={(rowData: IPayrollPay) => formatMoney(rowData.totalPay ?? 0)}
                />
                <Column
                    header="Acciones"
                    body={(rowData: IPayrollPay) => (
                        <Button
                            icon="pi pi-list-check"
                            className="mr-2"
                            rounded
                            severity="info"
                            onClick={handleDetails}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default PayrollHistoryTable;
