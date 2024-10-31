"use client";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import AddButton from "../../../Shared/Components/AddButton";
import useGetWorkSchedulerSubstituteByIdEmployee from "./Hooks/useGetWorkSchedulerSubstituteByIdEmployee";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit: (entity: IWorkSchedulerSubstitute) => void;
    handleDelete: (entity: IWorkSchedulerSubstitute) => void;
    handleAdd: () => void;
}

const WorkSchedulerSubstituteTable = ({
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
    const { data, isLoading } = useGetWorkSchedulerSubstituteByIdEmployee(
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
            <h3 className="m-0">Suplencias</h3>
            <AddButton
                handleAdd={handleAdd}
                entity={idEmployee}
                accessName="SUPLENCIA"
            />
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="m-2">
            <DataTable
                value={data}
                header={header}
                className="p-datatable-sm"
                dataKey="idWorkSchedulerSubstitute"
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
                    field="workScheduler"
                    header="Horario"
                    sortable
                    filter
                    filterField="Name"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    field="startDate"
                    header="Fecha Inicio"
                    body={(rowData: IWorkSchedulerSubstitute) =>
                        formatDate(rowData.startDate?.toString()!)
                    }
                />
                <Column
                    field="endDate"
                    header="Fecha Final"
                    body={(rowData: IWorkSchedulerSubstitute) =>
                        formatDate(rowData.endDate?.toString()!)
                    }
                />
                <Column
                    field="description"
                    header="Descripción"
                    sortable
                    filter
                    filterField="description"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                />
                <Column
                    header="Acciones"
                    body={(rowData: IWorkSchedulerSubstitute) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            accessName="SUPLENCIA"
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default WorkSchedulerSubstituteTable;
