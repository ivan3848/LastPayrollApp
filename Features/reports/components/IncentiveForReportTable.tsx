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
import useIncentiveForReportQuery from "../Hook/useIncentiveForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IIncentiveForReport } from "../Types/IIncentiveForReport";
import { Dropdown } from "primereact/dropdown";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const IncentiveForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = useIncentiveForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useIncentiveForReportQuery(
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
        const text = "Reporte de incentivos";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Nombre",
                    "Posición",
                    "Departamento",
                    "Nómina",
                    "Incentivo",
                    "fecha de carga",
                    "Fecha de ejecución",
                    "Fecha de pago",
                    "Se efectuó",
                    "Monto",
                    "Impuesto",
                    "Pago",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.employee,
                item.position,
                item.department,
                item.payrollName,
                item.description,
                item.chargeDate,
                item.dateExecuted,
                item.payDate,
                item.isExecuted,
                item.amount,
                item.tax,
                item.isPaid,
            ]),
            startY: 20,
        });
        doc.save("ReporteIncentivos.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const incentiveWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = incentiveWithoutIdentifier.map((incentive) => {
            return {
                "Codigo de Empleado": incentive.idEmployee ?? "N/A",
                Nombre: incentive.employee ?? "N/A",
                Posición: incentive.position ?? "N/A",
                Departamento: incentive.department ?? "N/A",
                Nómina: incentive.payrollName ?? "N/A",
                Incentivo: incentive.description ?? "N/A",
                "Fecha de carga":
                    new Date(incentive.chargeDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                "Fecha de ejecución":
                    new Date(incentive.dateExecuted)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                "Fecha de pago":
                    new Date(incentive.payDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                "Se efectuó": incentive.isExecuted ?? "N/A",
                Monto:
                    incentive.amount.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                Impuesto:
                    incentive.tax.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                Pago: incentive.isPaid ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "IncentiveForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de incentivos
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
                id="IncentiveForReport-Table"
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
                    field="employee"
                    header="Nombre"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employee"
                    filterPlaceholder="Buscar por nombre"
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
                    field="payrollName"
                    header="Nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payrollName"
                    filterPlaceholder="Buscar por nómina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="description"
                    header="Incentivo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="description"
                    filterPlaceholder="Buscar por incentivo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="chargeDate"
                    header="Fecha de carga"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="chargeDate"
                    filterPlaceholder="Buscar por fecha de carga"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IIncentiveForReport) =>
                        rowData.chargeDate
                            ? new Date(rowData.chargeDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="dateExecuted"
                    header="Fecha de ejecución"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="dateExecuted"
                    filterPlaceholder="Buscar por fecha de ejecución"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IIncentiveForReport) =>
                        rowData.dateExecuted
                            ? new Date(rowData.dateExecuted)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="payDate"
                    header="Fecha de pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="payDate"
                    filterPlaceholder="Buscar por fecha de pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IIncentiveForReport) =>
                        rowData.payDate
                            ? new Date(rowData.payDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="isExecuted"
                    header="Se efectuó"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterElement={yesNoFilter}
                    filterField="isExecuted"
                    filterPlaceholder="Buscar por se efectuó"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amount"
                    header="Monto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IIncentiveForReport) =>
                        rowData.amount
                            ? rowData.amount.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="tax"
                    header="Impuesto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="tax"
                    filterPlaceholder="Buscar por impuesto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IIncentiveForReport) =>
                        rowData.tax
                            ? rowData.tax.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
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

export default IncentiveForReportTable;
