import useRegionQuery from "@/Features/region/Hooks/useRegionQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useCityQuery from "../Hooks/useCityQuery";
import { ICity } from "../Types/ICity";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import { Skeleton } from "primereact/skeleton";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: ICity) => void;
    handleDelete: (entity: ICity) => void;
}

const CityTable = ({
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
    const { data, isFetching } = useCityQuery(params, listOfDependencies);

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
            {isFetching ? (
                <Skeleton
                    height="2rem"
                    width="25rem"
                    className="mb-2"
                ></Skeleton>
            ) : (
                <h3 className="m-0">Ciudades</h3>
            )}
            {isFetching ? (
                <Skeleton borderRadius="20px" width="8rem" height="3rem" />
            ) : (
                <AddSingleButton handleAdd={handleAdd} accessName="UBICACION" />
            )}
        </div>
    );

    return (
        <DataTable
            id="City-Table"
            dataKey="idCity"
            value={data?.items}
            lazy
            paginator
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
                header="Ciudad"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="name"
                filterPlaceholder="Buscar por ciudad"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="regionName"
                header="Región"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="idRegion"
                filterPlaceholder="Buscar por región"
                filterElement={
                    <TableDropDownFilter
                        useQuery={useRegionQuery}
                        text="name"
                        column="idRegion"
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
                body={
                    isFetching ? (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <Skeleton
                                shape="circle"
                                size="3rem"
                                className="mr-2"
                            />
                            <Skeleton
                                shape="circle"
                                size="3rem"
                                className="mr-2"
                            />
                        </div>
                    ) : (
                        (rowData) => (
                            <ActionTableTemplate<ICity>
                                entity={rowData}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                accessName="UBICACION"
                            />
                        )
                    )
                }
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default CityTable;
