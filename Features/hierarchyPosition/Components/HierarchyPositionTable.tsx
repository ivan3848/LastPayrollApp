import useRegionQuery from "@/Features/region/Hooks/useRegionQuery";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import TableDropDownFilter from "@/Features/Shared/Components/TableDropDownFilter";
import useParamFilter, {
    useParamAllData,
} from "@/Features/Shared/Hooks/useParamFilter";
import { Button } from "primereact/button";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { IHierarchyPosition } from "../Types/IHierarchyPosition";
import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import { CACHE_KEY_HIERARCHY_POSITION } from "@/constants/cacheKeys";
import hierarchyPositionService from "../Services/hierarchyPositionService";
import usePositionQuery from "@/Features/position/Hooks/usePositionQuery";
import GenericTableCheck from "@/Features/Shared/Components/GenericTableCheck";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IHierarchyPosition) => void;
    handleDelete: (entity: IHierarchyPosition) => void;
}

const HierarchyPositionTable = ({
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
    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_HIERARCHY_POSITION,
        hierarchyPositionService
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

    const verifiedFilterTemplate = (
        options: ColumnFilterElementTemplateOptions
    ) => {
        return (
            <div>
                <TriStateCheckbox
                    id="filter"
                    value={options.value}
                    onChange={(e) => {
                        options.filterCallback(e.value);
                        switch (e.value) {
                            case true:
                                setFilters([
                                    {
                                        column: options.field,
                                        value: true,
                                    },
                                ]);
                                break;
                            case false:
                                setFilters([
                                    {
                                        column: options.field,
                                        value: false,
                                    },
                                ]);
                                break;
                            default:
                                clearFilters();
                                break;
                        }
                    }}
                />
                <label className="ml-2" htmlFor="filter">
                    {options.value === true
                        ? "Si"
                        : options.value === false
                        ? "No"
                        : "Sin filtro"}
                </label>
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Vacantes</h3>

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
            id="HierarchyPosition-Table"
            dataKey="idHierarchyPosition"
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
                header="Vacante"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="name"
                filterPlaceholder="Buscar por vacante"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            {/* <Column
                field="positionCode"
                header="Código"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="positionCode"
                filterPlaceholder="Buscar por código"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column> */}

            <Column
                field="departmentPosition"
                header="Departamento y posición"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="idPosition"
                filterPlaceholder="Buscar por posición"
                filterElement={
                    <TableDropDownFilter
                        useQuery={usePositionQuery}
                        text="departmentPosition"
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
                field="isOccupied"
                header="Ocupado"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={(e) => <GenericTableCheck isChecked={e.isOccupied} />}
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />
            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IHierarchyPosition>
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

export default HierarchyPositionTable;
