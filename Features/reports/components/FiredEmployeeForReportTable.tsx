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
import useFiredEmployeeForReportQuery from "../Hook/useFiredEmployeeForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IFiredEmployeeForReport } from "../Types/IFiredEmployeeForReport";
interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const FiredEmployeeForReportTable = ({
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

    const { data, isLoading } = useFiredEmployeeForReportQuery(
        filterReport,
        params
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

    const exportPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const text = "Reporte Desvinculados";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Código Empleado",
                    "Empleado",
                    "Código Empleado Desvinculado",
                    "Cédula",
                    "Salario",
                    "Departamento",
                    "Concepto",
                    "Salario Diario",
                    "Navidad",
                    "Cesantía",
                    "Pre-Aviso",
                    "Vacaciones",
                    "Deuda Préstamo",
                    "Tiempo trabajado",
                    "Cantidad",
                    "Ingreso",
                    "Resumen",
                    // "Pago neto",
                ],
            ],
            body: data?.items.map((item) => [
                item.idEmployee,
                item.employeeName,
                item.idFiredEmployee,
                item.idPerson,
                item.employeeSalary,
                item.departmentName,
                item.conceptName,
                item.dailySalary,
                item.royaltiesDay,
                item.unemploymentDay,
                item.noticeDay,
                item.vacationDay,
                item.missLease,
                item.timeWork,
                item.amount,
                item.totalProfit,
                item.resume,
                // item.netPay,
            ]),
            startY: 20,
        });
        doc.save("ReporteDesvinculados.pdf");
    };

    const exportXLSX = () => {
        const fireEmployeeWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = fireEmployeeWithoutIdentifier.map((fireEmployee) => {
            return {
                "Código Empleado": fireEmployee.idEmployee ?? "N/A",
                Empleado: fireEmployee.employeeName ?? "N/A",
                "Código Empleado Desvinculado":
                    fireEmployee.idFiredEmployee ?? "N/A",
                Cédula: fireEmployee.identification ?? "N/A",
                Salario: fireEmployee.employeeSalary ?? "N/A",
                Departamento: fireEmployee.departmentName ?? "N/A",
                Concepto: fireEmployee.conceptName ?? "N/A",
                "Salario Diario": fireEmployee.dailySalary ?? "N/A",
                Navidad: fireEmployee.royaltiesDay ?? "N/A",
                Cesantía: fireEmployee.unemploymentDay ?? "N/A",
                "Pre-Aviso": fireEmployee.noticeDay ?? "N/A",
                Vacaciones: fireEmployee.vacationDay ?? "N/A",
                "Deuda Préstamo": fireEmployee.missLease ?? "N/A",
                "Tiempo trabajado": fireEmployee.timeWork ?? "N/A",
                Cantidad: fireEmployee.amount ?? "N/A",
                Ingreso: fireEmployee.totalProfit ?? "N/A",
                Resumen: fireEmployee.resume ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "FiredEmployeeForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte Desvinculados
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
                id="FiredEmployeeForReport-Table"
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
                    header="Código Empleado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idEmployee"
                    filterPlaceholder="Buscar por código empleado"
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
                    field="idFiredEmployee"
                    header="Código Empleado Desvinculado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idFiredEmployee"
                    filterPlaceholder="Buscar por código empleado desvinculado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="identification"
                    header="Cédula"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="identification"
                    filterPlaceholder="Buscar por cédula"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="employeeSalary"
                    header="Salario"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeSalary"
                    filterPlaceholder="Buscar por salario"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IFiredEmployeeForReport) =>
                        rowData.employeeSalary
                            ? rowData.employeeSalary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="departmentName"
                    header="Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="departmentName"
                    filterPlaceholder="Buscar por departamento"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="conceptName"
                    header="Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptName"
                    filterPlaceholder="Buscar por concepto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="dailySalary"
                    header="Salario Diario"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="dailySalary"
                    filterPlaceholder="Buscar por salario diario"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IFiredEmployeeForReport) =>
                        rowData.dailySalary
                            ? rowData.dailySalary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="royaltiesDay"
                    header="Navidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="royaltiesDay"
                    filterPlaceholder="Buscar por navidad"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="unemploymentDay"
                    header="Cesantía"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="unemploymentDay"
                    filterPlaceholder="Buscar por cesantía"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="noticeDay"
                    header="Pre-Aviso"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="noticeDay"
                    filterPlaceholder="Buscar por pre-aviso"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="vacationDay"
                    header="Vacaciones"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="vacationDay"
                    filterPlaceholder="Buscar por vacaciones"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="missLease"
                    header="Deuda Préstamo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="missLease"
                    filterPlaceholder="Buscar por deuda préstamo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IFiredEmployeeForReport) =>
                        rowData.missLease
                            ? rowData.missLease.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="timeWork"
                    header="Tiempo trabajado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="timeWork"
                    filterPlaceholder="Buscar por tiempo trabajado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amount"
                    header="Cantidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por cantidad"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IFiredEmployeeForReport) =>
                        rowData.amount
                            ? rowData.amount.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="totalProfit"
                    header="Ingreso"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="totalProfit"
                    filterPlaceholder="Buscar por ingreso"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IFiredEmployeeForReport) =>
                        rowData.totalProfit
                            ? rowData.totalProfit.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="resume"
                    header="Resumen"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="resume"
                    filterPlaceholder="Buscar por resumen"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                {/* <Column
                        field="netPay"
                        header="Pago neto"
                        headerStyle={{ minWidth: "15rem" }}
                        sortable
                        filter
                        filterField="netPay"
                        filterPlaceholder="Buscar por pago neto"
                        showFilterMenuOptions
                        onFilterApplyClick={(e) => onFilter(e.field)}
                        onFilterClear={clearFilters}
                        body={(rowData: IFiredEmployeeForReport) =>
                            rowData.netPay
                                ? rowData.netPay.toLocaleString("es-DO", {
                                      style: "currency",
                                      currency: "DOP",
                                  })
                                : "N/A"
                        }
                    ></Column> */}
            </DataTable>
        </div>
    );
};

export default FiredEmployeeForReportTable;
