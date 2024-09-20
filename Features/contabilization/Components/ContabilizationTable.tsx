"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import usePayrollPayQuery from "@/Features/payrollPay/Hook/usePayrollPayQuery";
import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";
import ActionsTableContabilization from "./ActionsTableContabilizaiton";

interface Props {
    submitted: boolean;
    handleContabilization1: (entity: IPayrollPay) => void;
    handleContabilization2: (entity: IPayrollPay) => void;
    handleDelete: (entity: IPayrollPay) => void;
}

const ContabilizationTable = ({
    submitted,
    handleContabilization1,
    handleContabilization2,
    handleDelete,
}: Props) => {
    const {
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
                    field="payrollNumber"
                    header="Numero de Nómina"
                    sortable
                    filter
                    filterField="payrollNumber"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="payrollName"
                    header="Nombre"
                    sortable
                    filter
                    filterField="payrollName"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="PayrollPayDate"
                    header="Fecha de pago"
                    body={(rowData: IPayrollPay) =>
                        formatDate(rowData.payrollPayDate?.toString()!)
                    }
                />
                <Column
                    header="Acciones"
                    body={(rowData: IPayrollPay) => (
                        <ActionsTableContabilization
                            entity={rowData}
                            Contabilization1={handleContabilization1}
                            Contabilization2={handleContabilization2}
                            handleDelete={handleDelete}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default ContabilizationTable;
