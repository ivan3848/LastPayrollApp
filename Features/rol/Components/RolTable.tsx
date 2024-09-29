import { useMemo, useCallback, useState } from "react";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_ROL } from "@/constants/cacheKeys";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableExpandedRows,
    DataTablePageEvent,
    DataTableSortEvent,
    DataTableValueArray,
} from "primereact/datatable";
import rolService from "../Service/rolService";
import IRol from "../Types/IRol";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IRol) => void;
    handleDelete: (entity: IRol) => void;
}

const RolTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
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

    const listOfDependencies = useMemo(() => [submitted], [submitted]);

    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_ROL,
        rolService
    );

    const onSort = useCallback(
        (event: DataTableSortEvent) => {
            if (event.sortOrder === 1) {
                setSorts([{ sortBy: event.sortField, isAsc: true }]);
            } else if (event.sortOrder === -1) {
                setSorts([{ sortBy: event.sortField, isAsc: false }]);
            } else {
                clearSorts();
            }
        },
        [setSorts, clearSorts]
    );

    const onFilter = useCallback(
        (event: any) => {
            const timeout = setTimeout(() => {
                setFilters([
                    {
                        column: event.field,
                        value: event.constraints?.constraints?.[0]?.value,
                    },
                ]);
            }, 300);

            return () => clearTimeout(timeout);
        },
        [setFilters]
    );

    const onPage = useCallback(
        (event: DataTablePageEvent) => {
            setPage(event.page! + 1);
            setPageSize(event.rows);
        },
        [setPage, setPageSize]
    );

    const header = useMemo(
        () => (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h3 className="m-0">Roles</h3>
                <Button
                    label="Agregar"
                    icon="pi pi-plus"
                    severity="info"
                    className="mr-2"
                    onClick={handleAdd}
                />
            </div>
        ),
        [handleAdd]
    );

    return (
        <DataTable
            value={data?.items}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            header={header}
            tableStyle={{ minWidth: "60rem" }}
            id="Rol-Table"
            lazy
            paginator
            loading={isLoading}
            onSort={onSort}
            removableSort
            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
            sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
            sortMode="single"
            totalRecords={data?.totalCount}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            emptyMessage="No hay registros para mostrar."
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25]}
            rows={data?.pageSize!}
            first={data.firstRow!}
            currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
        >
            <Column
                field="description"
                header="Descripción"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="description"
                filterPlaceholder="Buscar por descripción"
                showFilterMenuOptions={false}
                onFilterApplyClick={onFilter}
                onFilterClear={clearFilters}
            />
            {/* <Column
                field="isSuperUser"
                header="Administrador"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                body={(rowData) => (rowData.isSuperUser ? "Si" : "No")}
            /> */}
            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IRol>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            />
        </DataTable>
    );
};

export default RolTable;
