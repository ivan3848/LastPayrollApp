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
import useLicencesForReportQuery from "../Hook/useLicencesForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { ILicencesForReport } from "../Types/ILicencesForReport";
import { Dropdown } from "primereact/dropdown";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const LicencesForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = useLicencesForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useLicencesForReportQuery(
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
        const text = "Reporte de Licencias";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Código de empleado",
                    "Posición",
                    "Departamento",
                    "Empleado",
                    "Nombre de Doctor",
                    "Código de Concepto",
                    "Concepto",
                    "Dias no laborados",
                    "A Pagar",
                    "Nómina",
                    "Descripción",
                    "Inicio",
                    "Fin",
                    "Pago",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.idEmployee,
                item.position,
                item.department,
                item.employeeName,
                item.doctorName,
                item.conceptCode,
                item.conceptName,
                item.workDayOff,
                item.isToPay,
                item.payrollPay,
                item.description,
                item.startDate,
                item.endDate,
                item.isPaid,
            ]),
            startY: 20,
        });
        doc.save("ReporteDeLicencias.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const licencesWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = licencesWithoutIdentifier.map((licences) => {
            return {
                "Código de empleado": licences.idEmployee ?? "N/A",
                Posición: licences.position ?? "N/A",
                Departamento: licences.department ?? "N/A",
                Empleado: licences.employeeName ?? "N/A",
                "Nombre de Doctor": licences.doctorName ?? "N/A",
                "Código de Concepto": licences.conceptCode ?? "N/A",
                Concepto: licences.conceptName ?? "N/A",
                "Dias no laborados": licences.workDayOff ?? "N/A",
                "A Pagar": licences.isToPay ?? "N/A",
                Nómina: licences.payrollPay ?? "N/A",
                Descripción: licences.description ?? "N/A",
                Inicio:
                    new Date(licences.startDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                Fin:
                    new Date(licences.endDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                Pago: licences.isPaid ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "LicencesForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Licencias
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

    const yesNoOptions = [
        { label: "Si", value: true },
        { label: "No", value: false },
    ];

    const yesNoFilter = (options: any) => {
        return (
            <Dropdown
                value={options.value}
                options={yesNoOptions}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Selecciona Si o No"
                className="p-column-filter"
                showClear
            />
        );
    };

    return (
        <div className="card">
            <DataTable
                className="datatable-responsive"
                id="LicencesForReport-Table"
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idPosition"
                    header="Código de Posición"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idPosition"
                    filterPlaceholder="Buscar por código de posición"
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idDepartment"
                    header="Código de Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idDepartment"
                    filterPlaceholder="Buscar por código de departamento"
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idLicences"
                    header="Código Licencia"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idLicences"
                    filterPlaceholder="Buscar por código de licencia"
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="doctorName"
                    header="Nombre de Doctor"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="doctorName"
                    filterPlaceholder="Buscar por nombre de doctor"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="conceptCode"
                    header="Código de Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptCode"
                    filterPlaceholder="Buscar por código de concepto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="workDayOff"
                    header="Dias no laborados"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="workDayOff"
                    filterPlaceholder="Buscar por días no laborados"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="isToPay"
                    header="A Pagar"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterElement={yesNoFilter}
                    filterField="isToPay"
                    filterPlaceholder="Buscar por a pagar"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idPayrollPay"
                    header="Código nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idPayrollPay"
                    filterPlaceholder="Buscar por código de nómina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="payrollPay"
                    header="Nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payrollPay"
                    filterPlaceholder="Buscar por nómina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="description"
                    header="Descripción"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="description"
                    filterPlaceholder="Buscar por descripción"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="startDate"
                    header="Inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="startDate"
                    filterPlaceholder="Buscar por inicio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILicencesForReport) =>
                        rowData.startDate
                            ? new Date(rowData.startDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="endDate"
                    header="Fin"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="endDate"
                    filterPlaceholder="Buscar por fin"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILicencesForReport) =>
                        rowData.endDate
                            ? new Date(rowData.endDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="isPaid"
                    header="Pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterElement={yesNoFilter}
                    filterField="isPaid"
                    filterPlaceholder="Buscar por pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default LicencesForReportTable;
