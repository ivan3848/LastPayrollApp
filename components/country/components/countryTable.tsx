import useParamFilter from "@/components/Shared/Hooks/useParamFilter";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableFilterEvent,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useCountryQuery from "../Hooks/useCountryQuery";
import { ICountry } from "../Types/ICountry";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: ICountry) => void;
    handleDelete: (entity: ICountry) => void;
}

const CountryTable = ({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
}: Props) => {
    const { setPage, setPageSize, setFilters, setSorts, clearSorts, params } =
        useParamFilter();

    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading, isFetching } = useCountryQuery(
        params,
        listOfDependencies
    );

    const actionBodyTemplate = (rowData: ICountry) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="mr-2"
                    rounded
                    severity="info"
                    onClick={() => handleEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="secondary"
                    onClick={() => handleDelete(rowData)}
                />
            </>
        );
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

    const onFilter = (event: DataTableFilterEvent) => {
        console.log(event.filters);
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Países</h3>

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
            id="Country-Table"
            dataKey="idCountry"
            value={data?.items}
            lazy
            paginator
            loading={isLoading || isFetching}
            onSort={onSort}
            removableSort
            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
            sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
            sortMode="single"
            onFilter={onFilter}
            // filters={lazyState.filters}
            totalRecords={data?.totalCount}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            emptyMessage="No hay registros."
            header={header}
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25]}
            rows={data?.pageSize!}
            first={data.firstRow!}
            currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
        >
            <Column
                field="name"
                header="País"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="name"
                filterMatchMode={"contains" as FilterMatchMode}
            ></Column>
            <Column
                header="Acciones"
                body={actionBodyTemplate}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default CountryTable;
