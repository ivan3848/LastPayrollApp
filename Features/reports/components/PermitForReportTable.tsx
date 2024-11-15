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
import usePermitForReportQuery from "../Hook/usePermitForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IPermitForReport } from "../Types/IPermitForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const PermitForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading } = usePermitForReportQuery(filterReport, params);

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
        const text = "Reporte de permiso";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    //"Código Permiso",
                    //"Código de Posición",
                    "Posición",
                    //"Código de Departamento",
                    "Departamento",
                    "Empleado",
                    "Inicio",
                    "Final",
                    "Código Concepto",
                    "Concepto",
                    "Horas",
                    "Pago",
                    "A Pagar",
                ],
            ],
            body: data?.items.map((item) => [
                //item.idPermit,
                //item.idPosition,
                item.position,
                //item.idDepartment,
                item.department,
                item.employeeName,
                item.startDate,
                item.endDate,
                item.conceptCode,
                item.conceptName,
                item.hourAmount,
                item.isPaid,
                item.isToPay,
            ]),
            startY: 20,
        });
        doc.save("ReportePermiso.pdf");
    };

    const exportXLSX = () => {
        const permitWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = permitWithoutIdentifier.map((permit) => {
            return {
                //"Código Permiso": permit.idPermit ?? "N/A",
                //"Código de Posición": permit.idPosition ?? "N/A",
                Posición: permit.position ?? "N/A",
                //"Código de Departamento": permit.idDepartment ?? "N/A",
                Departamento: permit.department ?? "N/A",
                Empleado: permit.employeeName ?? "N/A",
                Inicio:
                    new Date(permit.startDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                Final:
                    new Date(permit.endDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                "Código Concepto": permit.conceptCode ?? "N/A",
                Concepto: permit.conceptName ?? "N/A",
                Horas: permit.hourAmount ?? "N/A",
                Pago: permit.isPaid ?? "N/A",
                "A Pagar": permit.isToPay ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "PermitForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de permiso
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
                id="PermitForReport-Table"
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
                    field="idPermit"
                    header="Código Permiso"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idPermit"
                    filterPlaceholder="Buscar por código permiso"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idDepartment"
                    header="Código de Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
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
                    header="Inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="startDate"
                    filterPlaceholder="Buscar por inicio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IPermitForReport) =>
                        rowData.startDate
                            ? new Date(rowData.startDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="endDate"
                    header="Final"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="endDate"
                    filterPlaceholder="Buscar por final"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IPermitForReport) =>
                        rowData.endDate
                            ? new Date(rowData.endDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="conceptCode"
                    header="Código Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptCode"
                    filterPlaceholder="Buscar por código concepto"
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
                    field="hourAmount"
                    header="Horas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="hourAmount"
                    filterPlaceholder="Buscar por horas"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="isPaid"
                    header="Pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="isPaid"
                    filterPlaceholder="Buscar por pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="isToPay"
                    header="A Pagar"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="isToPay"
                    filterPlaceholder="Buscar por a pagar"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default PermitForReportTable;
