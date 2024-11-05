"use client";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableExpandedRows,
    DataTablePageEvent,
    DataTableRowEvent,
    DataTableSortEvent,
    DataTableValueArray,
} from "primereact/datatable";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Toast } from "primereact/toast";
import { IWorkSchedulerPlan } from "../../workSchedulerPlan/Types/IWorkSchedulerPlan";
import { IWorkSchedulerPlanRequest } from "@/Features/workSchedulerPlan/Types/IWorkSchedulerPlanRequest";
import workSchedulerPlanService from "@/Features/workSchedulerPlan/Services/workSchedulerPlanService";
import IFilterReport from "@/Features/reports/Types/IFilterReport";
import useAccumulateForReportQuery from "@/Features/reports/Hook/useAccumulateForReportQuery";
import { IAccumulateForReport } from "@/Features/reports/Types/IAccumulateForReport";
import useEmployeeForReportQuery from "@/Features/reports/Hook/useEmployeeForReportQuery";

const WorkSchedulerPlanTable = () => {
    const {
        setPage,
        setPageSize,
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const { data, isLoading } = useAccumulateForReportQuery(
        "accumulateForReport" as IFilterReport,
        params
    );

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

    // const exportPDF = () => {
    //     const doc = new jsPDF();
    //     const pageWidth = doc.internal.pageSize.getWidth();
    //     const text = "Reporte de Acumulados";
    //     const textWidth = doc.getTextWidth(text);
    //     const textX = (pageWidth - textWidth) / 2;
    //     doc.text(text, textX, 16);
    //     autoTable(doc, {
    //         head: [
    //             [
    //                 "Código Acumulado",
    //                 "Código Empleado",
    //                 "Nomina",
    //                 "Concepto",
    //                 "Nombre Completo",
    //                 "Fecha",
    //                 "Cantidad",
    //             ],
    //         ],
    //         body: data?.items.map((item) => [
    //             item.idAccumulate,
    //             item.idEmployee,
    //             item.payrollName,
    //             item.concept,
    //             item.employeeName,
    //             item.date,
    //             item.amount,
    //         ]),
    //         startY: 20,
    //     });
    //     doc.save("ReporteAcumulados.pdf");
    // };

    // const exportXLSX = () => {
    //     const accumulateWithoutIdentifier = data.items.map(
    //         ({ identifier, ...rest }) => rest
    //     );

    //     const renamed = accumulateWithoutIdentifier.map((accumulate) => {
    //         return {
    //             "Código Acumulado": accumulate.idAccumulate ?? "N/A",
    //             "Código Empleado": accumulate.idEmployee ?? "N/A",
    //             Nomina: accumulate.payrollName ?? "N/A",
    //             Concepto: accumulate.concept ?? "N/A",
    //             "Nombre Completo": accumulate.employeeName ?? "N/A",
    //             Fecha:
    //                 new Date(accumulate.date)
    //                     .toLocaleDateString("en-GB")
    //                     .replace("-", "/") ?? "N/A",
    //             Cantidad: accumulate.amount ?? "N/A",
    //         };
    //     });

    //     const worksheet = XLSX.utils.json_to_sheet(renamed);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //     XLSX.writeFile(workbook, "AccumulateForReport.xlsx");
    // };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Plan de horario
            </h2>
            {/* <Button
                type="button"
                icon="pi pi-refresh"
                severity="help"
                rounded
                onClick={reset}
            /> */}
            {/* <Button
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
            /> */}
        </div>
    );

    const [expandedRows, setExpandedRows] = useState<
        DataTableExpandedRows | DataTableValueArray | undefined
    >(undefined);
    const toast = useRef<Toast>(null);
    const [workSchedulerPlan, setWorkSchedulerPlan] = useState<
        IWorkSchedulerPlan[] | null
    >(null);
    const onRowExpand = (event: DataTableRowEvent) => {
        toast.current?.show({
            severity: "info",
            summary: "Table Expanded",
            detail: event.data.name,
            life: 3000,
        });

        const newWorkSchedulerPlan: IWorkSchedulerPlanRequest = {
            from: new Date("2020-05-01T08:00:00.000Z"),
            to: new Date("2020-05-29T17:00:00.000Z"),
            idEmployee: event.data.idEmployee,
        };

        workSchedulerPlanService.post(newWorkSchedulerPlan).then((res) => {
            if (typeof res !== "string") {
                setWorkSchedulerPlan(res);
            }
        });
    };
    const onRowCollapse = (event: DataTableRowEvent) => {
        toast.current?.show({
            severity: "success",
            summary: "Table Collapsed",
            detail: event.data.name,
            life: 3000,
        });
    };
    const rowExpansionTemplate = () => {
        return (
            <div className="p-3">
                <DataTable value={workSchedulerPlan!}>
                    <Column field="id" header="Id" hidden sortable></Column>
                    <Column
                        field="date"
                        body={(rowData) =>
                            new Date(rowData.date)
                                .toLocaleDateString("en-GB")
                                .replace("-", "/")
                        }
                        header="Fecha"
                        sortable
                    ></Column>
                    <Column field="day" header="Dia" sortable></Column>
                    <Column field="schedule" header="Horario" sortable></Column>
                    <Column field="hourAmount" header="Horas" sortable></Column>
                    <Column
                        field="absenteeism"
                        header="Absentismo"
                        body={(rowData) =>
                            rowData.absenteeism !== null
                                ? rowData.absenteeism
                                : ""
                        }
                        sortable
                    ></Column>
                </DataTable>
            </div>
        );
    };

    const allowExpansion = (rowData: IAccumulateForReport) => {
        return data.items!.length > 0;
    };
    return (
        <div>
            <Toast ref={toast} />
            <DataTable
                id="AccumulateForReport-Table"
                dataKey="identifier"
                value={data?.items}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand}
                onRowCollapse={onRowCollapse}
                rowExpansionTemplate={rowExpansionTemplate}
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
                //header={header}
                onPage={onPage}
                rowsPerPageOptions={[5, 10, 25]}
                rows={data?.pageSize!}
                first={data.firstRow!}
                currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
            >
                <Column expander={allowExpansion} style={{ width: "5rem" }} />
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
                    field="idAccumulate"
                    header="Código Acumulado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idAccumulate"
                    filterPlaceholder="Buscar por código acumulado"
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
                    filterPlaceholder="Buscar por Concepto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
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
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="date"
                    header="Fecha"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="date"
                    filterPlaceholder="Buscar por Fecha"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IAccumulateForReport) =>
                        new Date(rowData.date)
                            .toLocaleDateString("en-GB")
                            .replace("-", "/")
                    }
                ></Column>
                <Column
                    field="amount"
                    header="Monto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por monto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                    body={(rowData: IAccumulateForReport) =>
                        rowData.amount.toLocaleString("es-DO", {
                            style: "currency",
                            currency: "DOP",
                        })
                    }
                ></Column>
            </DataTable>
        </div>
    );
};

export default WorkSchedulerPlanTable;
