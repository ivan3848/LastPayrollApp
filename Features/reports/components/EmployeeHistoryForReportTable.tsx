import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { useState } from "react";
import * as XLSX from "xlsx";
import useEmployeeHistoryForReportQuery from "../Hook/useEmployeeHistoryForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IEmployeeHistoryForReport } from "../Types/IEmployeeHistoryForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const EmployeeHistoryForReportTable = ({
    filterValues,
    setFilterValues,
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

    const [filterReport, setFilterReport] = useState<IFilterReport>(
        filterValues ?? {}
    );

    if (filterValues !== filterReport) {
        setFilterReport(filterValues!);
    }

    const { data, isLoading, refetch } = useEmployeeHistoryForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useEmployeeHistoryForReportQuery(
        filterReport,
        updatedParams
    );
    
    const reset = () => {
        setFilterValues({});
    };

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

    const exportPDF = async () => {
        await refetch();
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const text = "Reporte historial de empleados";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Empleado",
                    "Estatus",
                    "Departamento",
                    "Posición",
                    "Salario",
                    "Dependientes",
                    "Cambio",
                    "Hora extra",
                    "Area de Nomina",
                    "Inicio",
                    "Final",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.employeeName,
                item.employeeStatus,
                item.department,
                item.position,
                item.salaryHistory,
                item.numberOfDependant,
                item.changeType,
                item.extraHour,
                item.payrollArea,
                item.startDateChange,
                item.endDateChange,
            ]),
            startY: 20,
        });
        doc.save("ReporteHistorialEmpleado.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const employeeHistoryWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = employeeHistoryWithoutIdentifier.map(
            (employeeHistory) => {
                return {
                    //Código: employeeHistory.idEmployee ?? "N/A",
                    Empleado: employeeHistory.employeeName ?? "N/A",
                    Departamento: employeeHistory.department ?? "N/A",
                    Posición: employeeHistory.position ?? "N/A",
                    Salario:
                        employeeHistory.salaryHistory.toLocaleString("es-DO", {
                            style: "currency",
                            currency: "DOP",
                        }) ?? "N/A",
                    Dependientes: employeeHistory.numberOfDependant ?? "N/A",
                    Cambio: employeeHistory.changeType ?? "N/A",
                    "Hora extra": employeeHistory.extraHour ?? "N/A",
                    "Area de Nomina": employeeHistory.payrollArea ?? "N/A",
                    Inicio:
                        new Date(employeeHistory.startDateChange)
                            .toLocaleDateString("en-GB")
                            .replace("-", "/") ?? "N/A",
                    Final:
                        new Date(employeeHistory.endDateChange)
                            .toLocaleDateString("en-GB")
                            .replace("-", "/") ?? "N/A",
                    Estatus: employeeHistory.employeeStatus ?? "N/A",
                };
            }
        );

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "EmployeeHistoryForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte historial de empleados
            </h2>
            <Button
                type="button"
                icon="pi pi-refresh"
                severity="help"
                rounded
                onClick={reset}
            />
            <Button
                type="button"
                icon="pi pi-file-excel"
                severity="success"
                rounded
                onClick={exportXLSX}
                data-pr-tooltip="XLSX"
            />
            <Button
                type="button"
                icon="pi pi-file-pdf"
                severity="danger"
                rounded
                onClick={exportPDF}
                data-pr-tooltip="PDF"
            />
        </div>
    );

    return (
        <div className="card">
            <DataTable
                id="EmployeeHistoryForReport-Table"
                dataKey="identifier"
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
                    field="idEmployee"
                    header="Código"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idEmployee"
                    filterPlaceholder="Buscar por código"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="employeeName"
                    header="Empleado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeName"
                    filterPlaceholder="Buscar por empleado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="employeeStatus"
                    header="Estatus"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeStatus"
                    filterPlaceholder="Buscar por estatus"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="department"
                    header="Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="department"
                    filterPlaceholder="Buscar por departamento"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="position"
                    header="Posición"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="position"
                    filterPlaceholder="Buscar por posición"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="salaryHistory"
                    header="Salario"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="salaryHistory"
                    filterPlaceholder="Buscar por salario"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeHistoryForReport) =>
                        rowData.salaryHistory
                            ? rowData.salaryHistory.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="numberOfDependant"
                    header="Dependientes"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="numberOfDependant"
                    filterPlaceholder="Buscar por dependientes"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="changeType"
                    header="Cambio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="changeType"
                    filterPlaceholder="Buscar por cambio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="extraHour"
                    header="Hora extra"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="extraHour"
                    filterPlaceholder="Buscar por hora extra"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="payrollArea"
                    header="Area de Nomina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payrollArea"
                    filterPlaceholder="Buscar por area de nomina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="startDateChange"
                    header="Inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="startDateChange"
                    filterPlaceholder="Buscar por inicio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeHistoryForReport) =>
                        rowData.startDateChange
                            ? new Date(rowData.startDateChange)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="endDateChange"
                    header="Final"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="endDateChange"
                    filterPlaceholder="Buscar por final"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeHistoryForReport) =>
                        rowData.endDateChange
                            ? new Date(rowData.endDateChange)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
            </DataTable>
        </div>
    );
};

export default EmployeeHistoryForReportTable;
