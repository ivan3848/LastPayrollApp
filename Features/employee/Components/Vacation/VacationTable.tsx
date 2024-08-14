"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import useGetVacationByIdEmployee from "./Hooks/useGetVacationByIdEmployee";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: IVacation) => void;
    handleDelete: (entity: IVacation) => void;
    handleAdd: () => void;
}

const VacationTable = ({
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
    const { data, isLoading } = useGetVacationByIdEmployee(
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
            <h3 className="m-0">Permisos</h3>
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
                dataKey="idVacation"
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
                    field="start"
                    header="Fecha Inicio"
                    body={(rowData: IVacation) =>
                        formatDate(rowData.start?.toString()!)
                    }
                />
                <Column
                    field="end"
                    header="Fecha Final"
                    body={(rowData: IVacation) =>
                        formatDate(rowData.end?.toString()!)
                    }
                />
                <Column
                    field="absenteeism"
                    header="Dias de absentismo"
                    sortable
                    filter
                    filterField="absenteeism"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="enjoymentDay"
                    header="Dias de disfrute"
                    sortable
                    filter
                    filterField="enjoymentDay"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="dayPay"
                    header="Dias a pagar"
                    sortable
                    filter
                    filterField="dayPay"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    header="Acciones"
                    body={(rowData: IVacation) => (
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

export default VacationTable;
