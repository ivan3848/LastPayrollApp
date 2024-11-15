"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import usePayrollPayQuery from "@/Features/payrollPay/Hook/usePayrollPayQuery";
import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";
import { Button } from "primereact/button";

interface Props {
    submitted: boolean;
    handleDetails: (entity: IPayrollPay) => void;
}

const PayrollHistoryTable = ({
    submitted,
    handleDetails,
}: Props) => {
    const {
        setPage,
        setFilters,
        setPageSize,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter(5);

    const onPage = (event: DataTablePageEvent) => {
        setPage(event.page! + 1);
        setPageSize(event.rows);
    };

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
                loading={isLoading}
                lazy
                sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                sortOrder={
                    params.filter?.sorts?.[0]?.isAsc ? 1 : -1
                }
                totalRecords={data?.totalCount}
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                emptyMessage="No hay registros para mostrar."
                onPage={onPage}
                rowsPerPageOptions={[5, 10, 25]}
                rows={data?.pageSize!}
                first={data.firstRow!}
                currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}">
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
                    header="Fecha de corrida"
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
                            onClick={() => handleDetails(rowData)}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default PayrollHistoryTable;
