"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import useGetAmortizationByIdEmployee from "./Hooks/useGetAmortizationByIdLease";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";

interface Props {
    idLease: number;
    submitted: boolean;
    handleEdit?: (entity: IAmortization) => void;
    handleDelete?: (entity: IAmortization) => void;
    handleAdd: () => void;
}

const AmortizationTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idLease,
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
    const { data, isLoading } = useGetAmortizationByIdEmployee(
        params,
        listOfDependencies,
        idLease
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
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0"></h3>
            <AddButton handleAdd={handleAdd} entity={idLease} />
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                //header={header}
                className="p-datatable-sm"
                dataKey="idAmortization"
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
                    field="concept"
                    header="Amortización"
                    sortable
                    filter
                    filterField="idStatus"
                    filterPlaceholder="Buscar por banco"
                    filterElement={
                        <TableDropDownFilter
                            useQuery={useBankQuery}
                            text="concept"
                            column="idStatus"
                            setFilters={setFilters}
                            clearFilters={clearFilters}
                        />
                    }
                    showFilterMenuOptions={false}
                    showApplyButton={false}
                    showClearButton={false}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amount"
                    header="Monto"
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por cuotas"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="payDate"
                    header="Fecha de pago"
                    body={(rowData: IAmortization) =>
                        formatDate(rowData.payDate?.toString()!)
                    }
                />
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <ActionTableTemplate<IAmortization>
                            entity={rowData}
                            handleDelete={handleDelete!}
                            handleEdit={handleEdit}
                        />
                    )}
                    headerStyle={{ minWidth: "10rem" }}
                ></Column>
            </DataTable>
        </Card>
    );
};

export default AmortizationTable;
