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
import useRetroactiveHoursForReportQuery from "../Hook/useRetroactiveHoursForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IRetroactiveHoursForReport } from "../Types/IRetroactiveHoursForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const RetroactiveHoursForReportTable = ({
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

    const { data, isLoading, refetch } = useRetroactiveHoursForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useRetroactiveHoursForReportQuery(
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
        const text = "Reporte de horas retroactivas";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Empleado",
                    "Fecha",
                    "Nomina",
                    "Centro de Costo",
                    "Concepto",
                    "Departamento",
                    "Cuenta contable",
                    "Numero de cuenta",
                    "Tipo de Hora",
                    "Posición",
                    "Salario",
                    "Cantidad de horas",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.fullName,
                item.date,
                item.payrollName,
                item.costCenter,
                item.concept,
                item.department,
                item.name,
                item.accountingAccountNumber,
                item.concept,
                item.position,
                item.salary,
                item.hourAmount,
            ]),
            startY: 20,
        });
        doc.save("ReporteHorasRetroactivas.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const retroactiveWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = retroactiveWithoutIdentifier.map((retroactive) => {
            return {
                "Codigo Empleado": retroactive.idEmployee,
                Empleado: retroactive.fullName,
                Fecha: retroactive.date,
                Nomina: retroactive.payrollName,
                "Centro de Costo": retroactive.costCenter,
                Concepto: retroactive.concept,
                Departamento: retroactive.department,
                "Cuenta contable": retroactive.name,
                "Numero de cuenta": retroactive.accountingAccountNumber,
                "Tipo de Hora": retroactive.concept,
                Posición: retroactive.position,
                Salario: retroactive.salary.toLocaleString("es-DO", {
                    style: "currency",
                    currency: "DOP",
                }),
                Monto: `${retroactive.hourAmount}h`,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "RetroactiveHoursForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Horas Retroactivas
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
                id="RetroactiveHoursForReport-Table"
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
                    hidden
                    filterField="idCostCenter"
                    filterPlaceholder="Buscar por código centro costo"
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="fullName"
                    header="Empleado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="fullName"
                    filterPlaceholder="Buscar por empleado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="date"
                    header="Fecha"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="date"
                    filterPlaceholder="Buscar por fecha"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IRetroactiveHoursForReport) =>
                        rowData.date
                            ? new Date(rowData.date)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="idPayrollPay"
                    header="ID Nomina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idPayrollPay"
                    filterPlaceholder="Buscar por ID nomina"
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="costCenter"
                    header="Centro de Costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="costCenter"
                    filterPlaceholder="Buscar por centro de costo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idConcept"
                    header="ID Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idConcept"
                    filterPlaceholder="Buscar por ID concepto"
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
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idAccountingAccount"
                    header="ID Cuenta contable"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idAccountingAccount"
                    filterPlaceholder="Buscar por ID cuenta contable"
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
                    field="name"
                    header="Cuenta contable"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="name"
                    filterPlaceholder="Buscar por cuenta contable"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="accountingAccountNumber"
                    header="Numero de cuenta"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountingAccountNumber"
                    filterPlaceholder="Buscar por numero de cuenta"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="concept"
                    header="Tipo de Hora"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="concept"
                    filterPlaceholder="Buscar por tipo de hora"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
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
                    field="salary"
                    header="Salario"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="salary"
                    filterPlaceholder="Buscar por salario"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IRetroactiveHoursForReport) =>
                        rowData.salary
                            ? rowData.salary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="hourAmount"
                    header="Monto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="hourAmount"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default RetroactiveHoursForReportTable;
