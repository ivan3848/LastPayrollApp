import { CACHE_KEY_BENEFIT_POSITION } from "@/constants/cacheKeys";
import { CONCEPT_TYPE_BENEFIT } from "@/constants/conceptTypes";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import TableDropDownConceptFilter from "@/Features/Shared/Components/TableDropDownConceptFilter";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import benefitPositionService from "../Services/benefitPositionService";
import { IBenefitPosition } from "../Types/IBenefitPosition";
import { Skeleton } from "primereact/skeleton";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IBenefitPosition) => void;
    handleDelete: (entity: IBenefitPosition) => void;
}

const BenefitPositionTable = ({
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
    const { data, isFetching } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_BENEFIT_POSITION,
        benefitPositionService
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
                <h3 className="m-0">Beneficios De Posiciones</h3>
            )}
            {isFetching ? (
                <Skeleton borderRadius="20px" width="8rem" height="3rem" />
            ) : (
                <AddSingleButton
                    handleAdd={handleAdd}
                    accessName="ASIGNACION"
                />
            )}
        </div>
    );

    return (
        <DataTable
            id="BenefitPosition-Table"
            dataKey="idBenefitPosition"
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
                field="position"
                header="Posición"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                body={isFetching && <Skeleton className="mb-2" />}
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
                field="concept"
                header="Concepto"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                body={isFetching && <Skeleton className="mb-2" />}
                filter
                filterField="idConcept"
                filterPlaceholder="Buscar por concepto"
                filterElement={
                    <TableDropDownConceptFilter
                        setFilters={setFilters}
                        clearFilters={clearFilters}
                        code={CONCEPT_TYPE_BENEFIT}
                    />
                }
                showFilterMenuOptions={false}
                showApplyButton={false}
                showClearButton={false}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="amount"
                header="Monto"
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="amount"
                filterPlaceholder="Buscar por monto"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
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
                            <ActionTableTemplate<IBenefitPosition>
                                entity={rowData}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                accessName="ASIGNACION"
                            />
                        )
                    )
                }
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default BenefitPositionTable;
