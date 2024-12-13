import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import { DataTablePageEvent, DataTableSortEvent, DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { IMassiveEmployeeData } from "../Types/IMassiveEmployee";

interface Props {
    data: any;
    showTable?: boolean;
    setShowTable: (valule: boolean) => void;
}

export interface IMassiveEmployee {
    employeeList: IMassiveEmployeeData[];
    repeatedEmployees?: number[];
    repeatedIdentifications?: string[];
}

const RepeatedEmployeeTable = ({ data, showTable, setShowTable }: Props) => {
    const {
        setPage,
        setPageSize,
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

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

    const hideDialog = () => {
        setShowTable(false);
    };
    const tableData = (data.repeatedEmployees || []).map((empId: number[], index: number) => ({
        id: `employee-${index}`,
        repeatedEmployees: empId,
        repeatedIdentifications: data.repeatedIdentifications?.[index] || "N/A",
    }));

    return (
        <Dialog
            visible={showTable}
            style={{ width: "450px" }}
            header="Empleados Repetidos"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <DataTable
                id="MassiveEmployee-Table"
                dataKey="id"
                value={tableData}
                lazy
                paginator
                onSort={onSort}
                removableSort
                sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
                sortMode="single"
                totalRecords={tableData.length}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                emptyMessage="No hay registros para mostrar."
                onPage={onPage}
                rowsPerPageOptions={[5, 10, 25]}
                rows={5} // Default rows per page
                first={0} // Default first row
                currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
            >
                <Column
                    field="repeatedEmployees"
                    header="Codigos repetidos"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="repeatedEmployees"
                    filterPlaceholder="Buscar por Codigo"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="repeatedIdentifications"
                    header="Identificaciones Invalidas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="repeatedIdentifications"
                    filterPlaceholder="Buscar por Identificacion"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </Dialog>
    )
}

export default RepeatedEmployeeTable