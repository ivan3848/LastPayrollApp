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
import usePunchForReportQuery from "../Hook/usePunchForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IPunchForReport } from "../Types/IPunchForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const PunchForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = usePunchForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = usePunchForReportQuery(
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
        const text = "Reporte de ponche";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Empleado",
                    "Horario",
                    "Posición",
                    "Departamento",
                    "Fecha de ponche",
                    "Entrada",
                    "Salida",
                    "Manual",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.employeeName,
                item.workScheduler,
                item.position,
                item.department,
                item.punchDate,
                item.hourIn,
                item.hourOut,
                item.hourOut,
            ]),
            startY: 20,
        });
        doc.save("ReportePonche.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const punchWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = punchWithoutIdentifier.map((punch) => {
            return {
                "Código Empleado": punch.idEmployee,
                Empleado: punch.employeeName,
                Horario: punch.workScheduler,
                Posición: punch.position,
                Departamento: punch.department,
                "Fecha de ponche": new Date(punch.punchDate)
                    .toLocaleDateString("en-GB")
                    .replace("-", "/"),
                Entrada: punch.hourIn,
                Salida: punch.hourOut,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "PunchForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de ponche
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
                id="PunchForReport-Table"
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
                    onFilterApplyClick={(e) => onFilter(e)}
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
                    field="workScheduler"
                    header="Horario"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="workScheduler"
                    filterPlaceholder="Buscar por horario"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="idPosition"
                    header="Código Posición"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idPosition"
                    filterPlaceholder="Buscar por código posición"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="idDepartment"
                    header="Código Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idDepartment"
                    filterPlaceholder="Buscar por código departamento"
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
                    field="punchDate"
                    header="Fecha de ponche"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="punchDate"
                    filterPlaceholder="Buscar por fecha de ponche"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IPunchForReport) =>
                        rowData.punchDate
                            ? new Date(rowData.punchDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>

                <Column
                    field="hourIn"
                    header="Entrada"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="hourIn"
                    filterPlaceholder="Buscar por entrada"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="hourOut"
                    header="Salida"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="hourOut"
                    filterPlaceholder="Buscar por salida"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default PunchForReportTable;
