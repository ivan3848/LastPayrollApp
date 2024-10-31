import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { IToolWorkDefinitionEmployee } from "../Types/IToolWorkDefinitionEmployee";
import useToolWorkDefinitionEmployeeQuery from "../Hooks/useToolWorkDefinitionEmployeeQuery";
import AddButton from "@/Features/Shared/Components/AddButton";

interface Props {
    idEmployee: number;
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IToolWorkDefinitionEmployee) => void;
    handleDelete: (entity: IToolWorkDefinitionEmployee) => void;
}

const ToolWorkDefinitionEmployeeTable = ({
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
    const { data, isLoading } = useToolWorkDefinitionEmployeeQuery(
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
            <h3 className="m-0">Herramientas A ASDe Trabajo</h3>

            <AddButton
                handleAdd={handleAdd}
                entity={idEmployee}
                accessName="HERRAMIENTAS"
            />
        </div>
    );

    return (
        <DataTable
            id="ToolWorkDefinitionEmployee-Table"
            dataKey="idToolWorkDefinitionEmployee"
            value={data}
            lazy
            paginator
            loading={isLoading}
            onSort={onSort}
            removableSort
            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
            sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
            sortMode="single"
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            emptyMessage="No hay registros para mostrar."
            header={header}
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25]}
            rows={5}
            first={1}
            currentPageReportTemplate={`Mostrando registros del ${data.length} de ${data.length}`}
        >
            <Column
                field="toolWorkDefinitionName"
                header="Herramienta De Trabajo"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="toolWorkDefinitionName"
                filterPlaceholder="Buscar por herramienta"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                field="assignationDate"
                header="Fecha de Asignación"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                body={(rowData) => formatDate(rowData.assignationDate)}
                filterField="assignationDate"
                filterPlaceholder="Buscar por Fecha de Asignación"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                field="description"
                header="Descripción"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="description"
                filterPlaceholder="Buscar por descripción"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IToolWorkDefinitionEmployee>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        accessName="HERRAMIENTAS"
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default ToolWorkDefinitionEmployeeTable;
