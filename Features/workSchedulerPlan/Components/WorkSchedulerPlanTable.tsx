"use client";
import useEmployeeForReportQuery from "@/Features/reports/Hook/useEmployeeForReportQuery";
import { IEmployeeForReport } from "@/Features/reports/Types/IEmployeeForReport";
import IFilterReport from "@/Features/reports/Types/IFilterReport";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { workSchedulerDetailByIdService } from "@/Features/workSchedulerDetail/Services/workSchedulerServiceDetail";
import workSchedulerPlanService from "@/Features/workSchedulerPlan/Services/workSchedulerPlanService";
import { IWorkSchedulerPlanRequest } from "@/Features/workSchedulerPlan/Types/IWorkSchedulerPlanRequest";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTableExpandedRows,
    DataTablePageEvent,
    DataTableRowEvent,
    DataTableSortEvent,
    DataTableValueArray,
} from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { IWorkSchedulerDetail } from "../../workSchedulerDetail/Types/IWorkSchedulerDetail";
import { IWorkSchedulerPlan } from "../../workSchedulerPlan/Types/IWorkSchedulerPlan";

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

    const [idEmployee, idEmployeeSet] = useState<number | null>(null);
    const [startDate, startDateSet] = useState<Date | null>(null);
    const [endDate, endDateSet] = useState<Date | null>(null);

    const filterReport: IFilterReport = {
        idsEmployee: idEmployee ? [idEmployee] : [],
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [workSchedulerDetails, setWorkSchedulerDetails] = useState<
        IWorkSchedulerDetail[] | null
    >(null);

    const showModal = (idWorkScheduler: number) => {
        workSchedulerDetailByIdService
            .getEntitiesById(idWorkScheduler)
            .then((res) => {
                res && setWorkSchedulerDetails(res);
            });
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setWorkSchedulerDetails(null);
    };

    const { data, isLoading } = useEmployeeForReportQuery(filterReport, params);

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

    //?TO FIX
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
    //                     .toLocaleDateString("es-DO")
    //                     .replace("-", "/") ?? "N/A",
    //             Cantidad: accumulate.amount ?? "N/A",
    //         };
    //     });

    //     const worksheet = XLSX.utils.json_to_sheet(renamed);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //     XLSX.writeFile(workbook, "AccumulateForReport.xlsx");
    // };

    //?TO FIX
    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
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
        const newWorkSchedulerPlan: IWorkSchedulerPlanRequest = {
            from: startDate ?? new Date(Math.min(new Date().getTime())),
            to: endDate ?? new Date(Math.max(new Date().getTime())),
            idEmployee:
                idEmployee !== null ? idEmployee : event.data.idEmployee,
        };

        if (!startDate && !endDate) {
            const currentDate = new Date();
            const firstDayOfMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                1
            );
            const lastDayOfMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                0
            );
            newWorkSchedulerPlan.from = firstDayOfMonth;
            newWorkSchedulerPlan.to = lastDayOfMonth;
        }
        workSchedulerPlanService.post(newWorkSchedulerPlan).then((res) => {
            if (typeof res !== "string") {
                setWorkSchedulerPlan(res);
            }
        });
    };
    //const rowsPerPageOptions = [5, 10, 25];
    const [option, setOption] = useState(5);

    const updateOption = (newOption: number) => {
        if ([5, 10, 25].includes(newOption)) {
            setOption(newOption);
        }
    };
    const formatDate = (value: Date) => {
        return value.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };
    const rowExpansionTemplate = () => {
        return (
            <div className="p-3">
                <DataTable
                    value={workSchedulerPlan!}
                    id="EmployeeForReport-Table-WorkSchedulerPlan"
                    dataKey="id"
                    lazy
                    paginator
                    totalRecords={workSchedulerPlan?.length}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                    emptyMessage="No hay registros para mostrar."
                    rows={workSchedulerPlan?.length!}
                    first={workSchedulerPlan?.length!}
                    currentPageReportTemplate=""
                >
                    <Column field="id" header="Id" hidden sortable></Column>
                    <Column
                        field="date"
                        body={(rowData: IWorkSchedulerPlan) => {
                            const date = new Date(rowData.date);
                            date.setDate(date.getDate() + 1);

                            return date.toLocaleDateString("es-DO", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                timeZone: "America/Santo_Domingo",
                            });
                        }}
                        header="Fecha"
                        sortable
                    ></Column>
                    <Column field="day" header="Dia" sortable></Column>
                    <Column field="schedule" header="Horario" sortable></Column>
                    <Column field="hourAmount" header="Horas" sortable></Column>
                    <Column
                        field="absenteeism"
                        header="Absentismo"
                        body={(rowData: IWorkSchedulerPlan) =>
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

    const allowExpansion = () => {
        return data.items!.length > 0;
    };

    return (
        <div>
            <Dialog
                header="Detalles de Horario"
                visible={isModalVisible}
                style={{ width: "50vw" }}
                onHide={hideModal}
            >
                {workSchedulerDetails && (
                    <DataTable
                        value={workSchedulerDetails}
                        id="DetailsFromSchedulers-Table"
                        dataKey="idWorkSchedulerDetail"
                        lazy
                        paginator
                        totalRecords={workSchedulerDetails?.length}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        emptyMessage="No hay registros para mostrar."
                        rows={workSchedulerDetails?.length!}
                        first={workSchedulerDetails?.length!}
                        currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
                    >
                        <Column field="week" header="Turno" />
                        <Column field="days" header="Dias laborables" />
                        <Column
                            field="start"
                            header="Hora de entrada"
                            body={(rowData: IWorkSchedulerDetail) =>
                                new Date(rowData.start).toLocaleTimeString(
                                    "es-DO",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "America/Santo_Domingo",
                                    }
                                )
                            }
                        />
                        <Column
                            field="end"
                            header="Hora de salida"
                            body={(rowData: IWorkSchedulerDetail) =>
                                new Date(rowData.end).toLocaleTimeString(
                                    "es-DO",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "America/Santo_Domingo",
                                    }
                                )
                            }
                        />
                    </DataTable>
                )}
            </Dialog>
            <Toast ref={toast} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginTop: "35px",
                    marginBottom: "10px",
                }}
            >
                <div className="p-inputgroup flex-1"></div>
                <div className="p-inputgroup flex-1"></div>
                <div className="p-inputgroup flex-1"></div>

                <div className="p-inputgroup flex-1">
                    <span
                        className="p-inputgroup-addon"
                        style={{
                            backgroundColor: "var(--primary-color)",
                            color: "white",
                        }}
                    >
                        <i className="pi pi-user"></i>
                    </span>
                    <InputNumber
                        onValueChange={(e) => idEmployeeSet(e.value ?? null)}
                        placeholder="Código Empleado"
                    />
                </div>

                <Calendar
                    placeholder="Fecha Inicio"
                    showIcon
                    showButtonBar
                    onChange={(e) => {
                        startDateSet(e.value ?? null);
                    }}
                />
                <Calendar
                    placeholder="Fecha Fin"
                    showIcon
                    showButtonBar
                    onChange={(e) => {
                        endDateSet(e.value ?? null);
                    }}
                />
            </div>
            <DataTable
                id="AccumulateForReport-Table"
                dataKey="identifier"
                value={data?.items}
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand}
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
                onPage={onPage}
                rowsPerPageOptions={[5, 10, 25]}
                rows={data?.pageSize!}
                first={data.firstRow!}
                currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
            >
                <Column expander={allowExpansion} style={{ width: "5rem" }} />
                <Column
                    field="identification"
                    header="Cedula"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="identification"
                    filterPlaceholder="Buscar por cédula"
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
                    field="name"
                    header="Nombre Completo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="name"
                    filterPlaceholder="Buscar por nombre"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="sindicate"
                    header="Sindicato"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="sindicate"
                    filterPlaceholder="Buscar por sindicato"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeForReport) =>
                        rowData.sindicate ? "Si" : "No"
                    }
                ></Column>
                <Column
                    field="posicion"
                    header="Posicion"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="posicion"
                    filterPlaceholder="Buscar por posición"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="departamento"
                    header="Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="departamento"
                    filterPlaceholder="Buscar por departamento"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="workScheduler"
                    header="Horario"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="workScheduler"
                    filterPlaceholder="Buscar por horario laboral"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    header="Acciones"
                    body={(rowData: IEmployeeForReport) => (
                        <Button
                            rounded
                            style={{
                                backgroundColor: "var(--primary-color)",
                                width: "185px",
                            }}
                            label="Detalles de Horario"
                            onClick={() => showModal(rowData.idWorkScheduler)}
                        />
                    )}
                    headerStyle={{ minWidth: "10rem" }}
                ></Column>
            </DataTable>
        </div>
    );
};

export default WorkSchedulerPlanTable;
