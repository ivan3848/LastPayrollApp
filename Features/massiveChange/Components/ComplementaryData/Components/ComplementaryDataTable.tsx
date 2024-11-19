import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { IComplementaryData } from "../Types/IComplementaryData";
import useComplementaryDataQuery from "../Hooks/useComplementaryDataQuery";
interface Props {
    submitted: boolean;
    handleRevert: (entity: IComplementaryData) => void;
}

const ComplementaryDataTable = ({ submitted, handleRevert }: Props) => {
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
    const { data, isLoading } = useComplementaryDataQuery(
        params,
        listOfDependencies
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

    return (
        <DataTable
            id="ComplementaryData-Table"
            dataKey="idComplementaryData"
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
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25]}
            rows={data?.pageSize!}
            first={data.firstRow!}
            currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
        >
            <Column
                field="description"
                header="Nombre"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="description"
                filterPlaceholder="Buscar por Nombre"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                field="dateExecuted"
                header="Fecha de carga"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="dateExecuted"
                filterPlaceholder="Buscar por Fecha de carga"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
                body={(rowData) => {
                    const date = new Date(rowData.dateExecuted);
                    return date.toLocaleDateString();
                }}
            ></Column>
            <Column
                field="isPaid"
                header="Pago realizado"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="isPaid"
                filterPlaceholder="Buscar por Pago realizado"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
                body={(rowData) => (rowData.isPaid ? "Si" : "No")}
            ></Column>
            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IComplementaryData>
                        isCustomDelete={true}
                        entity={rowData}
                        handleDelete={handleRevert}
                        accessName="DATA_COMPLEMENTARIA"
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default ComplementaryDataTable;
