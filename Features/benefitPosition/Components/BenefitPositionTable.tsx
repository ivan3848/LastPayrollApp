import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useParamFilter, {
    useParamAllData,
} from "@/Features/Shared/Hooks/useParamFilter";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useBenefitPositionQuery from "../Hooks/useBenefitPositionQuery";
import { IBenefitPosition } from "../Types/IBenefitPosition";
import TableDropDownConceptFilter from "@/Features/Shared/Components/TableDropDownConceptFilter";

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
    const { data, isLoading } = useBenefitPositionQuery(
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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Beneficios De Posiciones</h3>

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
            id="BenefitPosition-Table"
            dataKey="idBenefitPosition"
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
                field="concept"
                header="Concepto"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="idConcept"
                filterPlaceholder="Buscar por concepto"
                filterElement={
                    <TableDropDownConceptFilter
                        setFilters={setFilters}
                        clearFilters={clearFilters}
                        code="PROC"
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
                    <ActionTableTemplate<IBenefitPosition>
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

export default BenefitPositionTable;
