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
import useVacationForReportQuery from "../Hook/useVacationForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IVacationForReport } from "../Types/IVacationForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const VacationForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading } = useVacationForReportQuery(filterReport, params);
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
        const text = "Reporte de Vacaciones";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Código de empleado",
                    "Empleado",
                    "Fecha inicio",
                    "Fecha fin",
                    "Pago",
                    "Pagado",
                    "Días de disfrute",
                    "Absentismos",
                    "Fecha de pago",
                    "Días a pagar",
                    "Nomina",
                    "Número de nómina",
                    "Posición",
                    "Departamento",
                    "Importe",
                    "Código de concepto",
                    "Concepto",
                ],
            ],
            body: data?.items.map((item) => [
                item.idEmployee,
                item.employeeName,
                item.startDate,
                item.endDate,
                item.paid,
                item.isPaid,
                item.enjoymentDay,
                item.absenteeism,
                item.payDate,
                item.dayToPay,
                item.payrollName,
                item.payrollNumber,
                item.position,
                item.department,
                item.amount,
                item.conceptCode,
                item.concept,
            ]),
            startY: 20,
        });
        doc.save("ReporteVacaciones.pdf");
    };

    const exportXLSX = () => {
        const vacationWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = vacationWithoutIdentifier.map((vacation) => {
            return {
                "Código de empleado": vacation.idEmployee,
                Empleado: vacation.employeeName,
                "Fecha inicio":
                    new Date(vacation.startDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",

                "Fecha fin":
                    new Date(vacation.endDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",

                Pago: vacation.paid,
                Pagado: vacation.isPaid,
                "Días de disfrute": vacation.enjoymentDay,
                Absentismos: vacation.absenteeism,
                "Fecha de pago":
                    new Date(vacation.payDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                "Días a pagar": vacation.dayToPay,
                Nomina: vacation.payrollName,
                "Número de nómina": vacation.payrollNumber,
                Posición: vacation.position,
                Departamento: vacation.department,
                Importe: vacation.amount,
                "Código de concepto": vacation.conceptCode,
                Concepto: vacation.concept,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "VacationForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Vacaciones
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
                id="VacationForReport-Table"
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
                    hidden
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
                    field="startDate"
                    header="Fecha inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="startDate"
                    filterPlaceholder="Buscar por fecha inicio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IVacationForReport) =>
                        rowData.startDate
                            ? new Date(rowData.startDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="endDate"
                    header="Fecha fin"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="endDate"
                    filterPlaceholder="Buscar por fecha fin"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IVacationForReport) =>
                        rowData.endDate
                            ? new Date(rowData.endDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="paid"
                    header="Pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="paid"
                    filterPlaceholder="Buscar por pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="isPaid"
                    header="Pagado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="isPaid"
                    filterPlaceholder="Buscar por pagado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="enjoymentDay"
                    header="Días de disfrute"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="enjoymentDay"
                    filterPlaceholder="Buscar por días de disfrute"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="absenteeism"
                    header="Absentismos"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="absenteeism"
                    filterPlaceholder="Buscar por absentismos"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="payDate"
                    header="Fecha de pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payDate"
                    filterPlaceholder="Buscar por fecha de pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IVacationForReport) =>
                        rowData.payDate
                            ? new Date(rowData.payDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="dayToPay"
                    header="Días a pagar"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="dayToPay"
                    filterPlaceholder="Buscar por días a pagar"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="payrollName"
                    header="Nomina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payrollName"
                    filterPlaceholder="Buscar por nomina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="payrollNumber"
                    header="Número de nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payrollNumber"
                    filterPlaceholder="Buscar por número de nómina"
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
                    field="amount"
                    header="Importe"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por importe"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IVacationForReport) =>
                        rowData.amount
                            ? rowData.amount.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="conceptCode"
                    header="Código de concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptCode"
                    filterPlaceholder="Buscar por código de concepto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="concept"
                    header="Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="concept"
                    filterPlaceholder="Buscar por concepto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default VacationForReportTable;
