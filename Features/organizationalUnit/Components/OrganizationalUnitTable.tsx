import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useOrganizationalUnitQuery from "../Hooks/useOrganizationalUnitQuery";
import { IOrganizationalUnit } from "../Types/IOrganizationalUnit";
import { Skeleton } from "primereact/skeleton";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IOrganizationalUnit) => void;
    handleDelete: (entity: IOrganizationalUnit) => void;
}

const OrganizationalUnitTable = ({
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
    const { data, isFetching } = useOrganizationalUnitQuery(
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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            {isFetching ? (
                <Skeleton
                    height="2rem"
                    width="25rem"
                    className="mb-2"
                ></Skeleton>
            ) : (
                <h3 className="m-0">Unidad Organizacional</h3>
            )}
            {isFetching ? (
                <Skeleton borderRadius="20px" width="8rem" height="3rem" />
            ) : (
                <AddSingleButton handleAdd={handleAdd} accessName="NOMINA" />
            )}
        </div>
    );

    return (
        <DataTable
            id="OrganizationalUnit-Table"
            dataKey="idOrganizationalUnit"
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
                header="Unidad organizacional"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="name"
                filterPlaceholder="Buscar por unidad organizacional"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e as any)}
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
                            <ActionTableTemplate<IOrganizationalUnit>
                                entity={rowData}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                accessName="NOMINA"
                            />
                        )
                    )
                }
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default OrganizationalUnitTable;
