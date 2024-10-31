import useCityQuery from "@/Features/city/Hooks/useCityQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useProvinceQuery from "../Hooks/useProvinceQuery";
import { IProvince } from "../Types/IProvince";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IProvince) => void;
    handleDelete: (entity: IProvince) => void;
}

const ProvinceTable = ({
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
    const { data, isLoading } = useProvinceQuery(params, listOfDependencies);

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
            <h3 className="m-0">Provincias</h3>

            <AddSingleButton handleAdd={handleAdd} accessName="UBICACION" />
        </div>
    );

    return (
        <DataTable
            id="Province-Table"
            dataKey="idProvince"
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
                field="name"
                header="Provincia"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="name"
                filterPlaceholder="Buscar por provincia"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="cityName"
                header="Ciudad"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="idCity"
                filterPlaceholder="Buscar por ciudad"
                filterElement={(event: any) => (
                    <TableDropDownFilter
                        useQuery={useCityQuery}
                        text="name"
                        column="idCity"
                        setFilters={setFilters}
                        clearFilters={clearFilters}
                    />
                )}
                showFilterMenuOptions={false}
                showApplyButton={false}
                showClearButton={false}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IProvince>
                        entity={rowData}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        accessName="UBICACION"
                    />
                )}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default ProvinceTable;
