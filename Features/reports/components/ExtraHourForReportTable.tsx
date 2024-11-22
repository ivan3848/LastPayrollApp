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
import useExtraHourForReportQuery from "../Hook/useExtraHourForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IExtraHourForReport } from "../Types/IExtraHourForReport";
import { Dropdown } from "primereact/dropdown";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const ExtraHourForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = useExtraHourForReportQuery(
        filterReport,
        params
    );
    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useExtraHourForReportQuery(
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
        const text = "Reporte de Horas Extras";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Numero de Cuenta",
                    "Código Empleado",
                    "Código horas no Laboradas",
                    "Empleado",
                    "Centro de Costo",
                    "Salario",
                    "Porcentaje",
                    "Código Concepto",
                    "Tipo de hora",
                    "Cantidad de horas",
                    "Valor de hora",
                    "Fecha",
                    "Pago",
                    "Nomina",
                    "Código Nomina",
                    "Código Posición",
                    "Código Departamento",
                    "Posición",
                    "Departamento",
                    // "Total de Horas",
                    // "Total Cantidad",
                    "Código Centro de Costo",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.accountNumber,
                item.idEmployee,
                item.idExtraHourLateness,
                item.fullName,
                item.costCenter,
                item.salary,
                item.percentValue,
                item.conceptCode,
                item.concept,
                item.hourAmount,
                item.amount,
                item.date,
                item.isPaid,
                item.payrollName,
                item.idPayrollPay,
                item.idPosition,
                item.idDepartment,
                item.position,
                item.department,
                //item.totalHour,
                // item.totalAmount,
                item.idCostCenter,
            ]),
            startY: 20,
        });
        doc.save("ReporteHorasExtras.pdf");
    };

    const exportXLSX = async () => {
        await refetch();

        const extraHourWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = extraHourWithoutIdentifier.map((extraHour) => {
            return {
                "Numero de Cuenta": extraHour.accountNumber ?? "N/A",
                "Código Empleado": extraHour.idEmployee ?? "N/A",
                Empleado: extraHour.fullName ?? "N/A",
                "Centro de Costo": extraHour.costCenter ?? "N/A",
                Salario:
                    extraHour.salary.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                Porcentaje:
                    extraHour.percentValue != null
                        ? `${extraHour.percentValue}%`
                        : "N/A",
                "Código Concepto": extraHour.conceptCode ?? "N/A",
                "Tipo de hora": extraHour.concept ?? "N/A",
                "Cantidad de horas": extraHour.hourAmount ?? "N/A",
                "Valor de hora":
                    extraHour.amount.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                Fecha:
                    new Date(extraHour.date)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                Pago: extraHour.isPaid ?? "N/A",
                Nomina: extraHour.payrollName ?? "N/A",
                //"Código Nomina": extraHour.idPayrollPay ?? "N/A",
                //"Código Posición": extraHour.idPosition ?? "N/A",
                //"Código Departamento": extraHour.idDepartment ?? "N/A",
                Posición: extraHour.position ?? "N/A",
                Departamento: extraHour.department ?? "N/A",
                //"Código Centro de Costo": extraHour.idCostCenter ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ExtraHourForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Horas Extras
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
                id="ExtraHourForReport-Table"
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
                    field="accountNumber"
                    header="Numero de Cuenta"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountNumber"
                    filterPlaceholder="Buscar numero de cuenta"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idEmployee"
                    header="Código Empleado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idEmployee"
                    filterPlaceholder="Buscar código de empleado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idExtraHourLateness"
                    header="Código horas no Laboradas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idExtraHourLateness"
                    filterPlaceholder="Buscar código de horas no laboradas"
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
                    filterPlaceholder="Buscar empleado"
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
                    filterPlaceholder="Buscar centro de costo"
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
                    filterPlaceholder="Buscar salario"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IExtraHourForReport) =>
                        rowData.salary
                            ? rowData.salary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="percentValue"
                    header="Porcentaje"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="percentValue"
                    filterPlaceholder="Buscar porcentaje"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IExtraHourForReport) =>
                        rowData.percentValue
                            ? `${rowData.percentValue}%`
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
                    filterPlaceholder="Buscar código de concepto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="concept"
                    header="Tipo de hora"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="concept"
                    filterPlaceholder="Buscar tipo de hora"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="hourAmount"
                    header="Cantidad de horas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="hourAmount"
                    filterPlaceholder="Buscar cantidad de horas"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amount"
                    header="Valor de hora"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar valor de hora"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IExtraHourForReport) =>
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
                    filterField="date"
                    filterPlaceholder="Buscar fecha"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IExtraHourForReport) =>
                        rowData.date
                            ? new Date(rowData.date)
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
                    filterPlaceholder="Buscar pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="payrollName"
                    header="Nomina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payrollName"
                    filterPlaceholder="Buscar nomina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="idPayrollPay"
                    header="Código Nomina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idPayrollPay"
                    filterPlaceholder="Buscar código de nomina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    filterPlaceholder="Buscar código de posición"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="idDepartment"
                    header="Código Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idDepartment"
                    filterPlaceholder="Buscar código de departamento"
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
                    filterPlaceholder="Buscar posición"
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
                    filterPlaceholder="Buscar departamento"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="totalHour"
                    header="Total de Horas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="totalHour"
                    filterPlaceholder="Buscar total de horas"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="totalAmount"
                    header="Total Cantidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="totalAmount"
                    filterPlaceholder="Buscar total cantidad"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="idCostCenter"
                    header="Código Centro de Costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idCostCenter"
                    filterPlaceholder="Buscar código de centro de costo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default ExtraHourForReportTable;
