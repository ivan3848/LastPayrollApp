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
import useProfitForReportQuery from "../Hook/useProfitForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IProfitForReport } from "../Types/IProfitForReport";
import { Dropdown } from "primereact/dropdown";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const ProfitForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = useProfitForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useProfitForReportQuery(
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
        const text = "Reporte de Beneficio";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Nombre Completo",
                    "Nombre de Concepto",
                    "Monto",
                    "Pagado",
                    "Inicio",
                    "Fin",
                    "Nómina",
                    "Fecha de Pago",
                    "Monto de Nómina",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.employeeName,
                item.conceptName,
                item.amount,
                item.isPaid,
                item.start,
                item.end,
                item.payrollName,
                item.payDate,
                item.amountFromPayroll,
            ]),
            startY: 20,
        });
        doc.save("ReporteBeneficio.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const profitWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = profitWithoutIdentifier.map((profit) => {
            return {
                "Nombre Completo": profit.employeeName,
                "Nombre de Concepto": profit.conceptName,
                Monto: profit.amount.toLocaleString("es-DO", {
                    style: "currency",
                    currency: "DOP",
                }),
                Pagado: profit.isPaid,
                Inicio: new Date(profit.start)
                    .toLocaleDateString("en-GB")
                    .replace("-", "/"),
                Fin: new Date(profit.end)
                    .toLocaleDateString("en-GB")
                    .replace("-", "/"),
                Nómina: profit.payrollName,
                "Fecha de Pago": new Date(profit.payDate)
                    .toLocaleDateString("en-GB")
                    .replace("-", "/"),
                "Monto de Nómina": profit.amountFromPayroll,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ProfitForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Beneficio
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
                id="ProfitForReport-Table"
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
                    field="idProfit"
                    header="Código Beneficio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idProfit"
                    filterPlaceholder="Buscar por código beneficio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="employeeName"
                    header="Nombre Completo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeName"
                    filterPlaceholder="Buscar por nombre completo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="conceptName"
                    header="Nombre de Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptName"
                    filterPlaceholder="Buscar por nombre de concepto"
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
                    body={(rowData: IProfitForReport) =>
                        rowData.amount
                            ? rowData.amount.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="isPosition"
                    header="es Posición"
                    hidden
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterElement={yesNoFilter}
                    filterField="isPosition"
                    filterPlaceholder="Buscar por es posición"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="isPaid"
                    header="Pagado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="isPaid"
                    filterElement={yesNoFilter}
                    filterPlaceholder="Buscar por pagado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="start"
                    header="Inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="start"
                    filterPlaceholder="Buscar por inicio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IProfitForReport) =>
                        rowData.start
                            ? new Date(rowData.start)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="end"
                    header="Fin"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="end"
                    filterPlaceholder="Buscar por fin"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IProfitForReport) =>
                        rowData.end
                            ? new Date(rowData.end)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
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
                    body={(rowData: IProfitForReport) =>
                        rowData.payrollName ?? "N/A"
                    }
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="payDate"
                    header="Fecha de Pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="payDate"
                    filterPlaceholder="Buscar por fecha de pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IProfitForReport) =>
                        rowData.payDate
                            ? new Date(rowData.payDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="amountFromPayroll"
                    header="Monto de Nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amountFromPayroll"
                    filterPlaceholder="Buscar por monto de nómina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IProfitForReport) =>
                        rowData.amountFromPayroll
                            ? rowData.amountFromPayroll.toLocaleString(
                                  "es-DO",
                                  {
                                      style: "currency",
                                      currency: "DOP",
                                  }
                              )
                            : "N/A"
                    }
                ></Column>
            </DataTable>
        </div>
    );
};

export default ProfitForReportTable;
