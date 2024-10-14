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
import useConsolidatedDataForReportQuery from "../Hook/useConsolidatedDataForReportQuery";
import IFilterReport from "../Types/IFilterReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const ConsolidatedDataForReportTable = ({
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

    const { data, isLoading } = useConsolidatedDataForReportQuery(
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
        const text = "Reporte de data consolidada";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Código Centro Costo",
                    "Código Empleado",
                    "Empleado",
                    "Fecha",
                    "ID Nomina",
                    "Nomina",
                    "Centro de Costo",
                    "ID Concepto",
                    "Concepto",
                    "ID Cuenta contable",
                    "Numero de cuenta",
                    "Cuenta contable",
                    "Monto",
                ],
            ],
            body: data?.items.map((item) => [
                item.idCostCenter,
                item.idEmployee,
                item.employeeName,
                item.extraHourDate,
                item.idPayrollPay,
                item.payrollName,
                item.costCenterName,
                item.idConcept,
                item.concept,
                item.idAccountingAccount,
                item.accountNumber,
                item.name,
                item.extraHourAmount,
            ]),
            startY: 20,
        });
        doc.save("ReporteDataConsolidada.pdf");
    };

    const exportXLSX = () => {
        const consolidatedWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = consolidatedWithoutIdentifier.map((consolidate) => {
            return {
                "Código Centro Costo": consolidate.idCostCenter ?? "N/A",
                "Código Empleado": consolidate.idEmployee ?? "N/A",
                Empleado: consolidate.employeeName ?? "N/A",
                Fecha:
                    new Date(consolidate.extraHourDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                Nomina: consolidate.payrollName ?? "N/A",
                "Centro de Costo": consolidate.costCenterName ?? "N/A",
                Concepto: consolidate.concept ?? "N/A",
                "ID Cuenta contable": consolidate.idAccountingAccount ?? "N/A",
                "Numero de cuenta": consolidate.accountNumber ?? "N/A",
                "Cuenta contable": consolidate.name ?? "N/A",
                Monto:
                    consolidate.extraHourAmount.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ConsolidatedDataForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de data consolidada
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
                id="ConsolidatedDataForReport-Table"
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
                    header="Código Centro Costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idCostCenter"
                    filterPlaceholder="Buscar por código Centro Costo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
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
                    filterPlaceholder="Buscar por Empleado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="extraHourDate"
                    header="Fecha"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="extraHourDate"
                    filterPlaceholder="Buscar por Fecha"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idPayrollPay"
                    header="ID Nomina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idPayrollPay"
                    filterPlaceholder="Buscar por ID Nomina"
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
                    filterPlaceholder="Buscar por Nomina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="costCenterName"
                    header="Centro de Costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="costCenterName"
                    filterPlaceholder="Buscar por centro de costo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idConcept"
                    header="ID Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idConcept"
                    filterPlaceholder="Buscar por ID Concepto"
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
                <Column
                    field="idAccountingAccount"
                    header="ID Cuenta contable"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idAccountingAccount"
                    filterPlaceholder="Buscar por ID Cuenta contable"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="name"
                    header="Cuenta contable"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="name"
                    filterPlaceholder="Buscar por cuenta contable"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="extraHourAmount"
                    header="Monto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="extraHourAmount"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default ConsolidatedDataForReportTable;
