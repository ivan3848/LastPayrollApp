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
                    "Codigo Posicion Jerarquica",
                    "Primer Apellido",
                    "Segundo Apellido",
                    "Sexo",
                    "Cedula",
                    "Fecha de inicio",
                    "Fecha de nacimiento",
                    "Salario",
                    "Posicion",
                    "Codigo de posicion",
                    "Departamento",
                    "Supervisor",
                    "Codigo de Departamento",
                    //"Es supervisor",
                    "Funcion",
                    "Codigo de grupo",
                    //"Imagen de Empleado",
                    "Sindicato",
                    //"Codigo position jerarquica",
                    "Codigo de horario",
                    "Horario Laboral",
                    "Codigo Area de nómina",
                    "Discapacidad",
                    "Codigo zona",
                    "Zona",
                    "Codigo Nacionalidad",
                    "Codigo Educacion",
                    "Fecha de Desvinculacion",
                    "Status Ocupacion",
                    // "Estado de empleado",
                    "Area de nómina",
                    "Centro de Costo",
                    "Correo",
                    "Labor Directa",
                    "Banco",
                    "Método de pago",
                    "Número de cuenta",
                ],
            ],
            body: data?.items.map((item) => [
                item.idEmployee,
                item.accountNumberCC,
                item.name,
                item.idHierarchyPosition,
                item.firstLastName,
                item.secondLastName,
                item.idGender,
                item.idPerson,
                item.employeeStartDate,
                item.birthDate,
                item.salary,
                item.posicion,
                item.idPosition,
                item.departamento,
                item.supervisor,
                item.idDepartment,
                //item.isSupervisor,
                item.functionDescription,
                item.idGroupManager,
                //item.employeeImage,
                item.sindicate,
                //item.idHierarchyPositionManager,
                item.idWorkScheduler,
                item.workScheduler,
                item.idPayrollArea,
                item.idDisability,
                item.idZone,
                item.zone,
                item.idNationality,
                item.idEducation,
                item.firedDate,
                item.isOccupied,
                //item.employeeStatus,
                item.payrollArea,
                item.costCenter,
                item.email,
                item.isWorkRelation,
                item.bankName,
                item.paymentMethod,
                item.accountNumber,
            ]),
            startY: 20,
        });
        doc.save("ReporteEmpleados.pdf");
    };

    const exportXLSX = () => {
        const worksheet = XLSX.utils.json_to_sheet(data?.items);
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
                    field="idHierarchyPosition"
                    header="Codigo Posicion Jerarquica"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idHierarchyPosition"
                    filterPlaceholder="Buscar por código de posición jerárquica"
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
                    field="zipCode"
                    header="Codigo Postal"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="zipCode"
                    filterPlaceholder="Buscar por código postal"
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
                    field="idPosition"
                    header="Codigo de posicion"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idPosition"
                    filterPlaceholder="Buscar por código de posición"
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
                    field="idDepartment"
                    header="Codigo de Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idDepartment"
                    filterPlaceholder="Buscar por código de departamento"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="isSupervisor"
                    header="Es supervisor"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="isSupervisor"
                    filterPlaceholder="Buscar por supervisor"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="functionDescription"
                    header="Funcion"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="functionDescription"
                    filterPlaceholder="Buscar por función"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="idGroupManager"
                    header="Codigo de grupo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idGroupManager"
                    filterPlaceholder="Buscar por código de grupo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="employeeImage"
                    header="Imagen de Empleado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeImage"
                    filterPlaceholder="Buscar por imagen de empleado"
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
                ></Column>
                <Column
                    field="idHierarchyPositionManager"
                    header="Codigo position jerarquica"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idHierarchyPositionManager"
                    filterPlaceholder="Buscar por código de posición jerárquica"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="idWorkScheduler"
                    header="Codigo de horario"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idWorkScheduler"
                    filterPlaceholder="Buscar por código de horario"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
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
                    field="idPayrollArea"
                    header="Codigo Area de nómina"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idPayrollArea"
                    filterPlaceholder="Buscar por código de área de nómina"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idDisability"
                    header="Discapacidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idDisability"
                    filterPlaceholder="Buscar por discapacidad"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idZone"
                    header="Codigo zona"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idZone"
                    filterPlaceholder="Buscar por código de zona"
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
                    field="idNationality"
                    header="Codigo Nacionalidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idNationality"
                    filterPlaceholder="Buscar por código de nacionalidad"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idEducation"
                    header="Codigo Educacion"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idEducation"
                    filterPlaceholder="Buscar por código de educación"
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
                ></Column>
                <Column
                    field="isOccupied"
                    header="Status Ocupacion"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="isOccupied"
                    filterPlaceholder="Buscar por status de ocupación"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="employeeStatus"
                    header="Estado de empleado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeStatus"
                    filterPlaceholder="Buscar por estado de empleado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
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
