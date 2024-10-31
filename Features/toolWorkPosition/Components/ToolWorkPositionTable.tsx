import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useParamFilter, {
    useParamAllData,
} from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useToolWorkPositionQuery from "../Hooks/useToolWorkPositionQuery";
import { IToolWorkPosition } from "../Types/IToolWorkPosition";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IToolWorkPosition) => void;
    handleDelete: (entity: IToolWorkPosition) => void;
}

const ToolWorkPositionTable = ({
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
    const { data, isLoading } = useToolWorkPositionQuery(
        params,
        listOfDependencies
    );

    const { params: filter } = useParamAllData();
    const { data: dataPosition } = usePositionQuery(filter, []);
    const { data: dataToolWorkDefinition } = useToolWorkPositionQuery(
        filter,
        []
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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Herramientas De Posiciones</h3>

            <AddSingleButton handleAdd={handleAdd} accessName="ASIGNACION" />
        </div>
    );

    return (
        <DataTable
            id="ToolWorkPosition-Table"
            dataKey="idToolWorkPosition"
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
                field="position"
                header="Posición"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="idPosition"
                filterPlaceholder="Buscar por posición"
                filterElement={
                    <TableDropDownFilter
                        useQuery={usePositionQuery}
                        text="name"
                        column="idPosition"
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
                field="toolWork"
                header="Herramienta"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="idToolWorkDefinition"
                filterPlaceholder="Buscar por herramienta"
                filterElement={
                    <TableDropDownFilter
                        useQuery={useToolWorkPositionQuery}
                        text="name"
                        column="idToolWorkDefinition"
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
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IToolWorkPosition>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        accessName="ASIGNACION"
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default ToolWorkPositionTable;
