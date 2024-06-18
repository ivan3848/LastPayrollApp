import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_WORK_SCHEDULER } from "@/constants/cacheKeys";
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
import workSchedulerService from "../Services/workSchedulerService";
import { IWorkScheduler, IWorkSchedulerDetail } from "../Types/IWorkScheduler";
import "animate.css";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IWorkScheduler) => void;
    handleDelete: (entity: IWorkScheduler) => void;
}

const WorkSchedulerTable = ({
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

    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_WORK_SCHEDULER,
        workSchedulerService
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

    const allowExpansion = (rowData: IWorkScheduler) => {
        return rowData.workSchedulerDetail!.length > 0;
    };

    const cleanStartDate = (rowData: IWorkSchedulerDetail) => {
        return new Date(rowData.start).toLocaleTimeString();
    };

    const cleanEndDate = (rowData: IWorkSchedulerDetail) => {
        return new Date(rowData.end).toLocaleTimeString();
    };
    const rowExpansionTemplate = (data: IWorkScheduler) => {
        return (
            <div className="p-3 animate__animated animate__fadeIn">
                <h5>Turnos de: {data.name}</h5>
                <DataTable value={data.workSchedulerDetail}>
                    <Column
                        field="start"
                        body={cleanStartDate}
                        header="Hora de entrada"
                    ></Column>
                    <Column
                        field="end"
                        body={cleanEndDate}
                        header="Hora de salida"
                    ></Column>
                    <Column field="days" header="Días"></Column>
                    <Column field="week" header="Turno"></Column>
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Horarios</h3>

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
        <DataTable
            value={data.items}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="idWorkScheduler"
            header={header}
            tableStyle={{ minWidth: "60rem" }}
            id="WorkScheduler-Table"
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
            <Column expander={allowExpansion} style={{ width: "5px" }} />

            <Column
                field="name"
                header="Horario"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="name"
                filterPlaceholder="Buscar por horario"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="workSchedulerCode"
                header="Código"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="workSchedulerCode"
                filterPlaceholder="Buscar por código"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IWorkScheduler>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default WorkSchedulerTable;
