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
import useCostForReportQuery from "../Hook/useCostForReportQuery";
import IFilterReport from "../Types/IFilterReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const CostForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading } = useCostForReportQuery(filterReport, params);

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
        const text = "Reporte de Costo";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Codigo de Centro de costo",
                    "Centro de costo",
                    "Numero de cuenta",
                    "Departamento",
                    "Concepto",
                    "Horas Normales",
                    "Cantidad de Horas Extras",
                    "Valor de Horas Extras",
                    "Mes",
                ],
            ],
            body: data?.items.map((item) => [
                item.idCostCenter,
                item.costCenter,
                item.accountNumber,
                item.department,
                item.concept,
                item.normalHour,
                item.extraHourAmount,
                item.extraHourValue,
                item.month,
            ]),
            startY: 20,
        });
        doc.save("ReporteCosto.pdf");
    };

    const exportXLSX = () => {
        const costWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = costWithoutIdentifier.map((cost) => {
            return {
                "Codigo de Centro de costo": cost.idCostCenter ?? "N/A",
                "Centro de costo": cost.costCenter ?? "N/A",
                "Numero de cuenta": cost.accountNumber ?? "N/A",
                Departamento: cost.department ?? "N/A",
                Concepto: cost.concept ?? "N/A",
                "Horas Normales": cost.normalHour ?? "N/A",
                "Cantidad de Horas Extras": cost.extraHourAmount ?? "N/A",
                "Valor de Horas Extras": cost.extraHourValue ?? "N/A",
                Mes:
                    new Date(cost.month)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "CostForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Costo
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
                id="CostForReport-Table"
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
                    field="idCostCenter"
                    header="Código centro de costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idCostCenter"
                    filterPlaceholder="Buscar por código centro de costo"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="costCenter"
                    header="Centro de costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="costCenter"
                    filterPlaceholder="Buscar por centro de costo"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="accountNumber"
                    header="Numero de cuenta"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountNumber"
                    filterPlaceholder="Buscar por numero de cuenta"
                    showFilterMenuOptions={false}
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
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
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
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="normalHour"
                    header="Horas normales"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="normalHour"
                    filterPlaceholder="Buscar por horas normales"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="extraHourAmount"
                    header="Cantidad de horas extras"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="extraHourAmount"
                    filterPlaceholder="Buscar por cantidad de horas extras"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="extraHourValue"
                    header="Valor de horas extras"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="extraHourValue"
                    filterPlaceholder="Buscar por valor de horas extras"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="month"
                    header="Mes"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="month"
                    filterPlaceholder="Buscar por mes"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default CostForReportTable;
