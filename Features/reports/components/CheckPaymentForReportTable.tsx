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
import useCheckPaymentForReportQuery from "../Hook/useCheckPaymentForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { ICheckPaymentForReport } from "../Types/ICheckPaymentForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const CheckPaymentForReportTable = ({
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

    const { data, isLoading, refetch } = useCheckPaymentForReportQuery(
        filterReport,
        params
    );
    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useCheckPaymentForReportQuery(
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
        const text = "Reporte de pago por cheque";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    //"Código Empleado",
                    "Nombre",
                    "Método de pago",
                    "Importe",
                    "Fecha de nómina",
                ],
            ],
            body: excelData?.items.map((item) => [
                //item.idEmployee,
                item.employeeName,
                item.paymentMethod,
                item.amount,
                item.payrollPayDate,
            ]),
            startY: 20,
        });
        doc.save("ReportePagoPorCheque.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const checkPayWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = checkPayWithoutIdentifier.map((checkPay) => {
            return {
                "Código Empleado": checkPay.idEmployee ?? "N/A",
                Nombre: checkPay.employeeName ?? "N/A",
                "Método de pago": checkPay.paymentMethod ?? "N/A",
                Importe:
                    checkPay.amount.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                "Fecha de nómina":
                    new Date(checkPay.payrollPayDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "CheckPaymentForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de pago por cheque
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
                id="CheckPaymentForReport-Table"
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
                    header="Nombre"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeName"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="paymentMethod"
                    header="Método de pago"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="paymentMethod"
                    filterPlaceholder="Buscar por método de pago"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amount"
                    header="Importe"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por importe"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ICheckPaymentForReport) =>
                        rowData.amount.toLocaleString("es-DO", {
                            style: "currency",
                            currency: "DOP",
                        })
                    }
                ></Column>
                <Column
                    field="payrollPayDate"
                    header="Fecha de nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filterField="payrollPayDate"
                    filterPlaceholder="Buscar por fecha de nómina"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: ICheckPaymentForReport) =>
                        new Date(rowData.payrollPayDate)
                            .toLocaleDateString("en-GB")
                            .replace("-", "/")
                    }
                ></Column>
            </DataTable>
        </div>
    );
};

export default CheckPaymentForReportTable;
