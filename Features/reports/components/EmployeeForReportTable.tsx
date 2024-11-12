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
import useEmployeeForReportQuery from "../Hook/useEmployeeForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IEmployeeForReport } from "../Types/IEmployeeForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}

const EmployeeForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading } = useEmployeeForReportQuery(filterReport, params);

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
        const text = "Reporte de Empleados";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Código de empleado",
                    "Número de cuenta",
                    "Nombre Completo",
                    "Cédula",
                    "Fecha de inicio",
                    "Salario",
                    "Posición",
                    "Departamento",
                    "Función",
                    "Sindicato",
                    "Horario Laboral",
                    "Zona",
                    "Fecha de Desvinculación",
                    "Area de nómina",
                    "Banco",
                    "Método de pago",
                ],
            ],
            body: data?.items.map((item) => [
                item.idEmployee,
                item.accountNumberCC,
                item.name,
                item.idPerson,
                item.employeeStartDate,
                item.salary,
                item.position,
                item.department,
                item.functionDescription,
                item.sindicate,
                item.workScheduler,
                item.zone,
                item.firedDate,
                item.payrollArea,
                item.bankName,
                item.paymentMethod,
            ]),
            startY: 20,
        });
        doc.save("ReporteEmpleados.pdf");
    };

    const exportXLSX = () => {
        const employeesWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = employeesWithoutIdentifier.map((employee) => {
            return {
                "Código de empleado": employee.idEmployee ?? "N/A",
                "Número de cuenta": employee.accountNumber ?? "N/A",
                "Nombre Completo": employee.name ?? "N/A",
                "Código Posición Jerárquica":
                    employee.idHierarchyPosition ?? "N/A",
                "Primer Apellido": employee.firstLastName ?? "N/A",
                "Segundo Apellido": employee.secondLastName ?? "N/A",
                Sexo: employee.idGender ?? "N/A",
                Cédula: employee.identification ?? "N/A",
                "Fecha de inicio":
                    new Date(employee.employeeStartDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                "Fecha de nacimiento":
                    new Date(employee.birthDate)
                        .toLocaleDateString("en-GB")
                        .replace("-", "/") ?? "N/A",
                Salario:
                    employee.salary.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                Posición: employee.position ?? "N/A",
                "Código de posición": employee.idPosition ?? "N/A",
                Departamento: employee.department ?? "N/A",
                Supervisor: employee.supervisor ?? "N/A",
                "Código de Departamento": employee.idDepartment ?? "N/A",
                Función: employee.functionDescription ?? "N/A",
                "Código de grupo": employee.idGroupManager ?? "N/A",
                Sindicato: employee.sindicate ? "Si" : "No",
                "Código de horario": employee.idWorkScheduler ?? "N/A",
                "Horario Laboral": employee.workScheduler ?? "N/A",
                "Código Area de nómina": employee.idPayrollArea ?? "N/A",
                Discapacidad: employee.idDisability ?? "N/A",
                "Código zona": employee.idZone ?? "N/A",
                Zona: employee.zone ?? "N/A",
                "Código Nacionalidad": employee.idNationality ?? "N/A",
                "Código Educación": employee.idEducation ?? "N/A",
                "Fecha de Desvinculación": employee.firedDate ?? "N/A",
                "Status Ocupación": employee.isOccupied ?? "N/A",
                "Area de nómina": employee.payrollArea ?? "N/A",
                "Centro de Costo": employee.costCenter ?? "N/A",
                Correo: employee.email ?? "N/A",
                "Labor Directa": employee.isWorkRelation ?? "N/A",
                Banco: employee.bankName ?? "N/A",
                "Método de pago": employee.paymentMethod ?? "N/A",
                "Número de cuenta CC": employee.accountNumberCC ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "EmployeeForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Empleados
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
                id="EmployeeForReport-Table"
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
                    field="accountNumberCC"
                    header="Número de cuenta"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountNumberCC"
                    filterPlaceholder="Buscar por número de cuenta"
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
                    field="firstLastName"
                    header="Primer Apellido"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="firstLastName"
                    filterPlaceholder="Buscar por primer apellido"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="secondLastName"
                    header="Segundo Apellido"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="secondLastName"
                    filterPlaceholder="Buscar por segundo apellido"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="sex"
                    header="Sexo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="sex"
                    filterPlaceholder="Buscar por sexo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
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
                    field="employeeStartDate"
                    header="Fecha de inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeStartDate"
                    filterPlaceholder="Buscar por fecha de inicio"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeForReport) =>
                        rowData.employeeStartDate
                            ? new Date(rowData.employeeStartDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>

                <Column
                    field="birthDate"
                    header="Fecha de nacimiento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="birthDate"
                    filterPlaceholder="Buscar por fecha de nacimiento"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeForReport) =>
                        rowData.birthDate
                            ? new Date(rowData.birthDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
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
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeForReport) =>
                        rowData.salary
                            ? rowData.salary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
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
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="supervisor"
                    header="Supervisor"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="supervisor"
                    filterPlaceholder="Buscar por supervisor"
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
                    field="workScheduler"
                    header="Horario Laboral"
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
                    field="disability"
                    header="Discapacidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="disability"
                    filterPlaceholder="Buscar por discapacidad"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="zone"
                    header="Zona"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="zone"
                    filterPlaceholder="Buscar por zona"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="nationality"
                    header="Nacionalidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="nationality"
                    filterPlaceholder="Buscar nacionalidad"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="education"
                    header="Educación"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="education"
                    filterPlaceholder="Buscar por educación"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="firedDate"
                    header="Fecha de Desvinculacion"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="firedDate"
                    filterPlaceholder="Buscar por fecha de desvinculación"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IEmployeeForReport) =>
                        rowData.firedDate
                            ? new Date(rowData.firedDate)
                                  .toLocaleDateString("en-GB")
                                  .replace("-", "/")
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="payrollArea"
                    header="Area de nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="payrollArea"
                    filterPlaceholder="Buscar por área de nómina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                <Column
                    field="costCenter"
                    header="Centro de Costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="costCenter"
                    filterPlaceholder="Buscar por centro de costo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="email"
                    header="Correo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="email"
                    filterPlaceholder="Buscar por correo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="isWorkRelation"
                    header="Labor Directa"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="isWorkRelation"
                    filterPlaceholder="Buscar por labor directa"
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
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="accountNumber"
                    header="Número de cuenta"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountNumber"
                    filterPlaceholder="Buscar por número de cuenta"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default EmployeeForReportTable;
