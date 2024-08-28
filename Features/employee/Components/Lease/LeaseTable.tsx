"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import useGetLeaseByIdEmployee from "./Hooks/useGetLeaseByIdEmployee";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: ILease) => void;
    handleDelete: (entity: ILease) => void;
    handleAdd: () => void;
}

const LeaseTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
    idEmployee,
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
    const { data, isLoading } = useGetLeaseByIdEmployee(
        params,
        listOfDependencies,
        idEmployee
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
            <h3 className="m-0">Prestamos</h3>
            <AddButton handleAdd={handleAdd} entity={idEmployee} />
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const verifiedFilterTemplate = (
        options: ColumnFilterElementTemplateOptions
    ) => {
        return (
            <div>
                <TriStateCheckbox
                    id="filter"
                    value={options.value}
                    onChange={(e) => {
                        options.filterCallback(e.value);
                        switch (e.value) {
                            case true:
                                setFilters([
                                    {
                                        column: options.field,
                                        value: true,
                                    },
                                ]);
                                break;
                            case false:
                                setFilters([
                                    {
                                        column: options.field,
                                        value: false,
                                    },
                                ]);
                                break;
                            default:
                                clearFilters();
                                break;
                        }
                    }}
                />
                <label className="ml-2" htmlFor="filter">
                    {options.value === true
                        ? "Si"
                        : options.value === false
                        ? "No"
                        : "Sin filtro"}
                </label>
            </div>
        );
    };

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                header={header}
                className="p-datatable-sm"
                dataKey="idLease"
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
                    field="amountFee"
                    header="Cuotas"
                    sortable
                    filter
                    filterField="amountFee"
                    filterPlaceholder="Buscar por cuotas"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="totalAmount"
                    header="Total"
                    sortable
                    filter
                    filterField="totalAmount"
                    filterPlaceholder="Buscar por total"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="entity"
                    header="Banco"
                    sortable
                    filter
                    filterField="idBank"
                    filterPlaceholder="Buscar por banco"
                    filterElement={
                        <TableDropDownFilter
                            useQuery={useBankQuery}
                            text="name"
                            column="idBank"
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
                    field="leaseNumber"
                    header="Numero de préstamo"
                    sortable
                    filter
                    filterField="leaseNumber"
                    filterPlaceholder="Buscar por préstamo"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="requestDate"
                    header="Fecha Aprobación"
                    body={(rowData: ILease) =>
                        formatDate(rowData.requestDate?.toString()!)
                    }
                />
                <Column
                    header="Acciones"
                    body={(rowData: ILease) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default LeaseTable;
