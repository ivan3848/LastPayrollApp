"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTable, DataTableSortEvent } from "primereact/datatable";
import { Card } from "primereact/card";
import AddButton from "../../../Shared/Components/AddButton";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useGetLeasePauseByIdEmployee from "./Hooks/useGetLeasePauseByIdEmployee";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleEdit?: (entity: ILeasePause) => void;
    handleDelete?: (entity: ILeasePause) => void;
    handleAdd: () => void;
    showAddLeasePauseBtn?: boolean;
}

const LeasePauseTable = ({
    submitted,
    handleDelete,
    handleEdit,
    idEmployee,
    handleAdd,
    showAddLeasePauseBtn,
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
    const { data, isLoading } = useGetLeasePauseByIdEmployee(
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
    const header = showAddLeasePauseBtn && (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Lista de suspensiones</h3>
            <AddButton
                handleAdd={handleAdd}
                entity={idEmployee}
                accessName="PRESTAMO"
            />
        </div>
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="m-2">
            <DataTable
                key={data?.length}
                value={data}
                header={header}
                className="p-datatable-sm animate-fadeIn"
                dataKey="idLease"
                id="leasePauseTable"
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
                    field="idLease"
                    header="Numero de préstamo/avance"
                    sortable
                    filter
                    filterField="idLease"
                    filterPlaceholder="Buscar por préstamo"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="startPauseDate"
                    header="Desde"
                    body={(rowData: ILeasePause) =>
                        formatDate(rowData.startPauseDate?.toString()!)
                    }
                />
                <Column
                    field="endPauseDate"
                    header="Hasta"
                    body={(rowData: ILeasePause) =>
                        formatDate(rowData.endPauseDate?.toString()!)
                    }
                />
                <Column
                    header="Acciones"
                    body={(rowData: ILeasePause) => (
                        <ActionTableTemplate
                            entity={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete!}
                        />
                    )}
                />
            </DataTable>
        </Card>
    );
};

export default LeasePauseTable;
