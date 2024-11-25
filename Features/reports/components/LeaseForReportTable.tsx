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
import useLeaseForReportQuery from "../Hook/useLeaseForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { ILeaseForReport } from "../Types/ILeaseForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const LeaseForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = useLeaseForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useLeaseForReportQuery(
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
        const text = "Reporte de Préstamo";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Nombre",
                    "Fecha Inicio",
                    "Fecha de solicitud",
                    "Banco",
                    "Cuotas",
                    "Deuda",
                    "Monto de Cuotas",
                    "Total pago",
                    "Total préstamo",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.employeeName,
                item.startDate,
                item.requestDate,
                item.bankName,
                item.fees,
                item.missToPay,
                item.amountFee,
                item.amountPay,
                item.totalAmount,
            ]),
            startY: 20,
        });
        doc.save("ReportePrestamo.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const leaseWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = leaseWithoutIdentifier.map((lease) => {
            return {
                "Código Empleado": lease.idEmployee ?? "N/A",
                Nombre: lease.employeeName ?? "N/A",
                "Fecha Inicio":
                    new Date(lease.startDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                "Fecha de solicitud":
                    new Date(lease.requestDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                Banco: lease.bankName ?? "N/A",
                Cuotas: lease.fees ?? "N/A",
                "Monto de Cuotas": lease.amountFee ?? "N/A",
                Deuda:
                    lease.missToPay.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                "Total pago":
                    lease.amountPay.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                "Total préstamo":
                    lease.totalAmount.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "LeaseForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Préstamo
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
                id="LeaseForReport-Table"
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
                    field="employeeName"
                    header="Nombre"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeName"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="startDate"
                    header="Fecha Inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="startDate"
                    filterPlaceholder="Buscar por fecha inicio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILeaseForReport) =>
                        rowData.startDate
                            ? new Date(rowData.startDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>

                <Column
                    field="requestDate"
                    header="Fecha de solicitud"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="requestDate"
                    filterPlaceholder="Buscar por fecha solicitud"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILeaseForReport) =>
                        rowData.requestDate
                            ? new Date(rowData.requestDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>

                <Column
                    field="bankKey"
                    header="Código de banco"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="bankKey"
                    filterPlaceholder="Buscar por código de banco"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="bankName"
                    header="Banco"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="bankName"
                    filterPlaceholder="Buscar por banco"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="fees"
                    header="Cuotas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="fees"
                    filterPlaceholder="Buscar cuotas"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="amountFee"
                    header="Monto de cuotas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amountFee"
                    filterPlaceholder="Buscar por monto de cuotas"
                    showFilterMenuOptions
                    body={(rowData: ILeaseForReport) => {
                        return rowData.amountFee
                            ? rowData.amountFee.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A";
                    }}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amountPay"
                    header="Total pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amountPay"
                    filterPlaceholder="Buscar por total pago"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILeaseForReport) =>
                        rowData.amountPay
                            ? rowData.amountPay.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>

                <Column
                    field="missToPay"
                    header="Deuda"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="missToPay"
                    filterPlaceholder="Buscar por deuda"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILeaseForReport) =>
                        rowData.missToPay
                            ? rowData.missToPay.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>

                <Column
                    field="totalAmount"
                    header="Total préstamo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="totalAmount"
                    filterPlaceholder="Buscar por total préstamo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ILeaseForReport) =>
                        rowData.totalAmount
                            ? rowData.totalAmount.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
            </DataTable>
        </div>
    );
};

export default LeaseForReportTable;
