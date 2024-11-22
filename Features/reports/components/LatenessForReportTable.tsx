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
import useLatenessForReportQuery from "../Hook/useLatenessForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { ILatenessForReport } from "../Types/ILatenessForReport";
import { Dropdown } from "primereact/dropdown";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const LatenessForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = useLatenessForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useLatenessForReportQuery(
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
        const text = "Reporte de horas no laboradas";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Empleado",
                    "Centro de Costo",
                    "Salario",
                    "Porcentaje",
                    "Tipo de Hora",
                    "Cantidad de Hora",
                    "Valor de Hora",
                    "Fecha",
                    "Nomina",
                    "Pago",
                    "Posición",
                    "Departamento",
                    "Numero de Cuenta",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.fullName,
                item.costCenter,
                item.salary,
                item.percentage,
                item.concept,
                item.hourAmount,
                item.amount,
                item.date,
                item.payrollName,
                item.isPaid,
                item.position,
                item.department,
                item.accountNumber,
            ]),
            startY: 20,
        });
        doc.save("ReporteHorasNoLaboradas.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const latenessWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = latenessWithoutIdentifier.map((lateness) => {
            return {
                Empleado: lateness.fullName ?? "N/A",
                "Centro de Costo": lateness.costCenter ?? "N/A",
                Salario:
                    lateness.salary.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                Porcentaje: `${lateness.percentage}%`,
                "Tipo de Hora": lateness.concept ?? "N/A",
                "Cantidad de Hora": lateness.hourAmount ?? "N/A",
                "Valor de Hora": lateness.amount ?? "N/A",
                Fecha:
                    new Date(lateness.date)
                        .toLocaleDateString()
                        .replace("-", "/") ?? "N/A",
                Nomina: lateness.payrollName ?? "N/A",
                Pago: lateness.isPaid ?? "N/A",
                Posición: lateness.position ?? "N/A",
                Departamento: lateness.department ?? "N/A",
                "Numero de Cuenta": lateness.accountNumber ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "LatenessForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de horas no laboradas
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
                id="LatenessForReport-Table"
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
                    field="idLateness"
                    header="Código Tardanza"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idLateness"
                    filterPlaceholder="Buscar por código tardanza"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    body={(rowData: ILatenessForReport) =>
                        rowData.salary
                            ? rowData.salary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="percentage"
                    header="Porcentaje"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="percentage"
                    filterPlaceholder="Buscar por porcentaje"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILatenessForReport) =>
                        rowData.percentage ? `${rowData.percentage}%` : "N/A"
                    }
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
                    field="hourAmount"
                    header="Cantidad de Hora"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="hourAmount"
                    filterPlaceholder="Buscar por cantidad de hora"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amount"
                    header="Valor de Hora"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por valor de hora"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILatenessForReport) =>
                        rowData.amount
                            ? rowData.amount.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="date"
                    header="Fecha"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="date"
                    filterPlaceholder="Buscar por fecha"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILatenessForReport) =>
                        rowData.date
                            ? new Date(rowData.date)
                                  .toLocaleDateString()
                                  .replace("-", "/")
                            : "N/A"
                    }
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
                    field="idPayrollPay"
                    header="Código Nomina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idPayrollPay"
                    filterPlaceholder="Buscar por código nomina"
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
                    filterElement={yesNoFilter}
                    filterField="isPaid"
                    filterPlaceholder="Buscar por pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idPosition"
                    header="Código Posición"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idPosition"
                    filterPlaceholder="Buscar por código posición"
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
                    field="accountNumber"
                    header="Numero de Cuenta"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountNumber"
                    filterPlaceholder="Buscar por numero de cuenta"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idCostCenter"
                    header="Código Centro de Costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idCostCenter"
                    filterPlaceholder="Buscar por código centro de costo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default LatenessForReportTable;
