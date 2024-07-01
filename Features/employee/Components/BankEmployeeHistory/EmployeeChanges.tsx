"use client";
import ActionTableTemplate from "@/Features/Shared/Components/ActionTableTemplate";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import useEmployeeQuery from "@/Features/employee/Hooks/useEmployeeQuery";
import useBankEmployeeHistory from "../../Hooks/useBankEmployeeHistory";
import { IEmployeeHistory } from "../../Types/IEmployeeHistory";

interface Props {
    submitted: boolean;
    handleEdit: (entity: IEmployeeHistory) => void;
    handleDelete: (entity: IEmployeeHistory) => void;
    handleAdd: (entity: IEmployeeHistory) => void;
}

const EmployeeChanges = ({ submitted, handleDelete, handleEdit }: Props) => {
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
    const { data, isLoading } = useBankEmployeeHistory(
        params,
        listOfDependencies
    );
    const employeeData = useEmployeeQuery(params, listOfDependencies);
    const start = data.items[0]?.startDate!;

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
            <h3 className="m-0">Historial Bancario</h3>
        </div>
    );

    return (
        <DataTable
            id="asf-Table"
            dataKey="idEmployee"
            value={data?.items}
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
            currentPageReportTemplate="Mostrando registros del{first} al {last} de {totalRecords}"
        >
            <Column field="startDate" header="Fecha de Inicio"></Column>
            <Column field="paymentMethod" header="Metodo"></Column>
            <Column
                field="accountNumber"
                header="Numero De Cuenta"
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterField="accountNumber"
                filterPlaceholder="Buscar Numero De Cuenta"
                showFilterMenuOptions={false}
                onFilterApplyClick={(e) => onFilter(e)}
                onFilterClear={clearFilters}
            ></Column>

            <Column
                field={"bankName"}
                header="Nombre del banco"
                headerStyle={{ minWidth: "15rem" }}
            ></Column>

            <Column
                header="Acciones"
                body={(rowData) => (
                    <ActionTableTemplate<IEmployeeHistory>
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

export default EmployeeChanges;
