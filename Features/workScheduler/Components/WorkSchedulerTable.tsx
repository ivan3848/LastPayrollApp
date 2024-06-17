import { IDepartment } from "@/Features/departments/Types/IDepartment";
import useEmployeeQuery from "@/Features/employee/Hooks/useEmployeeQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import MegaMenus from "./MegaMenus";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IDepartment) => void;
    handleDelete: (entity: IDepartment) => void;
}

const WorkSchedulerTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
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
    const { data, isLoading } = useEmployeeQuery(params, listOfDependencies);

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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Cambio de horario</h3>
            <MegaMenus />
        </div>
    );

    return (
        <DataTable
            id="WorkScheduler-Table"
            dataKey="idWorkScheduler"
            value={data?.items}
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
            header={header}
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25]}
            rows={data?.pageSize!}
            first={data.firstRow!}
            currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
        >
            <Column
                field="workSchedulerName"
                header="Horario de trabajo"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="workSchedulerName"
                filterPlaceholder="Buscar por Horario de trabajo"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                field="employeeName"
                header="Nombre del empleado"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="employeeName"
                filterPlaceholder="Buscar por nombre del empleado"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                field={"startDate"}
                header="Fecha de inicio"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="startDate"
                filterPlaceholder="Buscar por nombre del empleado"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
                body={(rowData) => {
                    const startDate = rowData.startDate?.split("T")[0] ?? "";
                    return <span>{startDate}</span>;
                }}
            ></Column>

            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IDepartment>
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
