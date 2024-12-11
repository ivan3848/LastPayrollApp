import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { ICostCenter } from "../Types/ICostCenter";
import useCostCenterQuery from "../Hooks/useCostCenterQuery";
import AddSingleButton from "@/Features/Shared/Components/AddSingleButton";
import { Skeleton } from "primereact/skeleton";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: ICostCenter) => void;
    handleDelete: (entity: ICostCenter) => void;
}

const CostCenterTable = ({
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
    const { data, isFetching } = useCostCenterQuery(params, listOfDependencies);
    
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
                <h3 className="m-0">Centros De Costos</h3>
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
            id="CostCenter-Table"
            dataKey="idCostCenter"
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
                field="description"
                header="Centro de costo"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="description"
                filterPlaceholder="Buscar por centro de costo"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>
            <Column
                field="accountNumber"
                header="Número de cuenta"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                body={isFetching && <Skeleton className="mb-2" />}
                filterField="accountNumber"
                filterPlaceholder="Buscar por número de cuenta"
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
                            <ActionTableTemplate<ICostCenter>
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
        // <>
        //     {true ? (
        //         <div className="border-round border-1 surface-border p-4">
        //             <div className="flex mb-3">
        //                 <div>
        //                     <Skeleton width="25rem" className="mb-2"></Skeleton>
        //                 </div>
        //             </div>
        //             <Skeleton width="100%" height="150px"></Skeleton>
        //         </div>
        //     ) : (
        //         <DataTable
        //             id="CostCenter-Table"
        //             dataKey="idCostCenter"
        //             value={data?.items}
        //             lazy
        //             paginator
        //             loading={isFetching}
        //             onSort={onSort}
        //             removableSort
        //             sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
        //             sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
        //             sortMode="single"
        //             totalRecords={data?.totalCount}
        //             className="datatable-responsive"
        //             paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        //             emptyMessage="No hay registros para mostrar."
        //             header={header}
        //             onPage={onPage}
        //             rowsPerPageOptions={[5, 10, 25]}
        //             rows={data?.pageSize!}
        //             first={data.firstRow!}
        //             currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
        //         >
        //             <Column
        //                 field="description"
        //                 header="Centro de costo"
        //                 headerStyle={{ minWidth: "15rem" }}
        //                 sortable
        //                 filter
        //                 filterField="description"
        //                 filterPlaceholder="Buscar por centro de costo"
        //                 showFilterMenuOptions={false}
        //                 onFilterApplyClick={(e) => onFilter(e)}
        //                 onFilterClear={clearFilters}
        //             ></Column>
        //             <Column
        //                 field="accountNumber"
        //                 header="Número de cuenta"
        //                 headerStyle={{ minWidth: "15rem" }}
        //                 sortable
        //                 filter
        //                 filterField="accountNumber"
        //                 filterPlaceholder="Buscar por número de cuenta"
        //                 showFilterMenuOptions={false}
        //                 onFilterApplyClick={(e) => onFilter(e)}
        //                 onFilterClear={clearFilters}
        //             ></Column>
        //             <Column
        //                 header="Acciones"
        //                 body={(rowData) => (
        //                     <ActionTableTemplate<ICostCenter>
        //                         entity={rowData}
        //                         handleDelete={handleDelete}
        //                         handleEdit={handleEdit}
        //                         accessName="NOMINA"
        //                     />
        //                 )}
        //                 headerStyle={{ minWidth: "10rem" }}
        //             ></Column>
        //         </DataTable>
        //     )}
        // </>
    );
};

export default CostCenterTable;
