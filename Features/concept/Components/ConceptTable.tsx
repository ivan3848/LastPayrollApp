import { TABLE_NAME_CONCEPT_TYPE } from "@/constants/StatusTableName";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import GenericTableCheck from "@/Features/Shared/Components/GenericTableCheck";
import TableDropDownStatusFilter from "@/Features/Shared/Components/TableDropDownStatusFilter";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Button } from "primereact/button";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import useConceptQuery from "../Hooks/useConceptQuery";
import { IConcept } from "../Types/IConcept";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import { Skeleton } from "primereact/skeleton";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IConcept) => void;
    handleDelete: (entity: IConcept) => void;
}

const ConceptTable = ({
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
    const { data, isFetching } = useConceptQuery(params, listOfDependencies);

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
            {isFetching ? (
                <Skeleton
                    height="2rem"
                    width="25rem"
                    className="mb-2"
                ></Skeleton>
            ) : (
                <h3 className="m-0">Conceptos</h3>
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
            id="Concept-Table"
            dataKey="idConcept"
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
                field="conceptCode"
                header="Código"
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="conceptCode"
                filterPlaceholder="Buscar por código de concepto"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="name"
                header="Concepto"
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="name"
                filterPlaceholder="Buscar por concepto"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="conceptType"
                header="Tipo"
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="idConceptType"
                filterPlaceholder="Buscar por tipo"
                filterElement={
                    <TableDropDownStatusFilter
                        setFilters={setFilters}
                        clearFilters={clearFilters}
                        tableName={TABLE_NAME_CONCEPT_TYPE}
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
                filterPlaceholder="Buscar por monto de concepto"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="percentValue"
                header="Porcentaje"
                sortable
                body={isFetching && <Skeleton className="mb-2" />}
                filter
                filterField="percentValue"
                filterPlaceholder="Buscar por porcentaje de concepto"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field="isSpecial"
                header="Especial"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e: IConcept) => (
                            <GenericTableCheck isChecked={e.isSpecial} />
                        )
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isBonification"
                header="Bonificación"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => (
                            <GenericTableCheck isChecked={e.isBonification} />
                        )
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isCommission"
                header="Comisión"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isCommission} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isAbsenteeism"
                header="Absentismo"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isAbsenteeism} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isLease"
                header="Préstamo"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isLease} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isExtraHour"
                header="Tipo de hora"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isExtraHour} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isTax"
                header="Impuesto"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isTax} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isCompany"
                header="Compañía"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isCompany} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isInsurance"
                header="Seguro"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isInsurance} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isProfit"
                header="Beneficio"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isProfit} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isDeduction"
                header="Deducción"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.isDeduction} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isOnlySecondPayroll"
                header="Último pago de mes"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => (
                            <GenericTableCheck
                                isChecked={e.isOnlySecondPayroll}
                            />
                        )
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="beforeIsr"
                header="Excluir de ISR"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => <GenericTableCheck isChecked={e.beforeIsr} />
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isForChargeTax"
                header="Para TSS"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => (
                            <GenericTableCheck isChecked={e.isForChargeTax} />
                        )
                    )
                }
                filter
                showAddButton={false}
                showApplyButton={false}
                showClearButton={false}
                showFilterMatchModes={false}
                showFilterMenuOptions={false}
                filterElement={verifiedFilterTemplate}
            />

            <Column
                field="isForChargeTaxIsr"
                header="Para ISR"
                dataType="boolean"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={
                    isFetching ? (
                        <Skeleton className="mb-2" />
                    ) : (
                        (e) => (
                            <GenericTableCheck
                                isChecked={e.isForChargeTaxIsr}
                            />
                        )
                    )
                }
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
                            <ActionTableTemplate<IConcept>
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

export default ConceptTable;
