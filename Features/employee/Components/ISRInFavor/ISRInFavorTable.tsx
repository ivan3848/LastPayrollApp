import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableExpandedRows,
    DataTablePageEvent,
    DataTableSortEvent,
    DataTableValueArray,
} from "primereact/datatable";
import { useState } from "react";
import "animate.css";
import { IISRInFavor } from "./Types/ISRInFavor";
import useISRInFavorByIdEmployee from "./Hooks/useISRInFavorByIdEmployee";
import { Card } from "primereact/card";

interface Props {
    id: number;
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IISRInFavor) => void;
    handleDelete: (entity: IISRInFavor) => void;
}

const ISRInFavorTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    id,
}: Props) => {
    const [expandedRows, setExpandedRows] = useState<
        DataTableExpandedRows | DataTableValueArray | undefined
    >(undefined);

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

    const { data, isLoading } = useISRInFavorByIdEmployee(
        params,
        listOfDependencies,
        id
    );

    const onPage = (event: DataTablePageEvent) => {
        setPage(event.page! + 1);
        setPageSize(event.rows);
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

    const allowExpansion = (rowData: IISRInFavor) => {
        return rowData.isrInFavorDetail!.length > 0;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("es-DO", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const rowExpansionTemplate = (data: IISRInFavor) => {
        return (
            <div className="p-3 animate__animated animate__fadeIn">
                <DataTable value={data.isrInFavorDetail}>
                    <Column field="idPayrollPay" header="Periodo"></Column>

                    <Column field={"idPayrollPay"} header="Nómina"></Column>

                    <Column field="amount" header="Monto"></Column>

                    <Column
                        field="date"
                        header="Fecha"
                        body={(rowData: IISRInFavor) =>
                            formatDate(rowData.date?.toString()!)
                        }
                    />
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">ISR a favor</h3>

            <Button
                label="Agregar"
                icon="pi pi-plus"
                severity="info"
                className="mr-2"
                onClick={handleAdd}
            />
        </div>
    );

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                header={header}
                tableStyle={{ minWidth: "60rem" }}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                className="p-datatable-sm"
                dataKey="idIsrInFavor"
                lazy
                id="isrInFavor-Table"
                paginator
                loading={isLoading}
                rows={5}
                onSort={onSort}
                removableSort
                sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
                sortMode="single"
                rowsPerPageOptions={[5, 10, 15]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column expander={allowExpansion} style={{ width: "5px" }} />

                <Column
                    field="conceptName"
                    header="Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptName"
                    filterPlaceholder="Buscar por Concepto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="originalAmount"
                    header="Monto original"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="originalAmount"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="missToPay"
                    header="Monto restante"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="missToPay"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="date"
                    header="Fecha"
                    body={(rowData: IISRInFavor) =>
                        formatDate(rowData.date?.toString()!)
                    }
                />

                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <ActionTableTemplate<IISRInFavor>
                            entity={rowData}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )}
                    headerStyle={{ minWidth: "10rem" }}
                ></Column>
            </DataTable>
        </Card>
    );
};

export default ISRInFavorTable;
