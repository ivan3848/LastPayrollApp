import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import ExcelJS from "exceljs";
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

const mockData = [
    {
        idEmployee: 1,
        identification: "123-45-6789",
        firstName: "John",
        middleName: "A.",
        firstLastName: "Doe",
        secondLastName: "Smith",
        sex: true,
        nationality: "American",
        birthDate: new Date(1990, 1, 1),
        salary: 50000,
        startDate: new Date(2020, 1, 1),
        occupation: "Developer",
        position: "Senior Developer",
        vacation: { start: new Date(2021, 6, 1), end: new Date(2021, 6, 15) },
        workSchedulerCode: "WS123",
        idZone: 1,
        education: "Bachelor's",
        disability: "None",
    },
    {
        idEmployee: 2,
        identification: "123-45-6789",
        firstName: "John",
        middleName: "A.",
        firstLastName: "Doe",
        secondLastName: "Smith",
        sex: true,
        nationality: "American",
        birthDate: new Date(1990, 1, 1),
        salary: 50000,
        startDate: new Date(2020, 1, 1),
        occupation: "Developer",
        position: "Senior Developer",
        vacation: { start: new Date(2021, 6, 1), end: new Date(2021, 6, 15) },
        workSchedulerCode: "WS123",
        idZone: 1,
        education: "Bachelor's",
        disability: "None",
    },
    {
        idEmployee: 3,
        identification: "123-45-6789",
        firstName: "John",
        middleName: "A.",
        firstLastName: "Doe",
        secondLastName: "Smith",
        sex: true,
        nationality: "American",
        birthDate: new Date(1990, 1, 1),
        salary: 50000,
        startDate: new Date(2020, 1, 1),
        occupation: "Developer",
        position: "Senior Developer",
        vacation: { start: new Date(2021, 6, 1), end: new Date(2021, 6, 15) },
        workSchedulerCode: "WS123",
        idZone: 1,
        education: "Bachelor's",
        disability: "None",
    },
];

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
                    "Código Posición Jerárquica",
                    "Primer Apellido",
                    "Segundo Apellido",
                    "Sexo",
                    "Cédula",
                    "Fecha de inicio",
                    "Fecha de nacimiento",
                    "Salario",
                    "Posición",
                    "Código de posición",
                    "Departamento",
                    "Supervisor",
                    "Código de Departamento",
                    "Función",
                    "Código de grupo",
                    "Sindicato",
                    "Código de horario",
                    "Horario Laboral",
                    "Código Area de nómina",
                    "Discapacidad",
                    "Código zona",
                    "Zona",
                    "Código Nacionalidad",
                    "Código Educación",
                    "Fecha de Desvinculación",
                    "Status Ocupación",
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
                item.functionDescription,
                item.idGroupManager,
                item.sindicate,
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
        const employeesWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const header = [
            "Código de empleado",
            "Número de cuenta",
            "Nombre Completo",
            "Código Posición Jerárquica",
            "Primer Apellido",
            "Segundo Apellido",
            "Sexo",
            "Cédula",
            "Fecha de inicio",
            "Fecha de nacimiento",
            "Salario",
            "Posición",
            "Código de posición",
            "Departamento",
            "Supervisor",
            "Código de Departamento",
            "Función",
            "Código de grupo",
            "Sindicato",
            "Código de horario",
            "Horario Laboral",
            "Código Area de nómina",
            "Discapacidad",
            "Código zona",
            "Zona",
            "Código Nacionalidad",
            "Código Educación",
            "Fecha de Desvinculación",
            "Status Ocupación",
            "Area de nómina",
            "Centro de Costo",
            "Correo",
            "Labor Directa",
            "Banco",
            "Método de pago",
            "Número de cuenta",
        ];

        const mapObjectToHeader = (item: any, header: any) => {
            const mappedObject = {} as any;
            header.forEach((key: any, index: any) => {
                const originalKey = Object.keys(item)[index];
                mappedObject[key] = item[originalKey];
            });
            return mappedObject;
        };

        const renamedEmployees = employeesWithoutIdentifier.map((item) =>
            mapObjectToHeader(item, header)
        );

        const worksheetData = [header, ...renamedEmployees.map(Object.values)];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "EmployeeForReport.xlsx");
    };

    const modifyExcelFile = async (
        data: any,
        filename: string,
        dgt: string
    ) => {
        const dirRelativeToPublicFolder = "report";
        const fileName = filename;
        const filePath = `/${dirRelativeToPublicFolder}/${fileName}`;

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileBuffer = await response.arrayBuffer();
        const file = new File([fileBuffer], fileName, {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(await file.arrayBuffer());

        const worksheet = workbook.getWorksheet(dgt);

        worksheet!.getCell("D7").value = "D7";
        worksheet!.getCell("D8").value = "D8";
        worksheet!.getCell("D9").value = "DGT3";

        let count0 = 14;

        const employees = data;

        employees.forEach((employee: any) => {
            const item = employees.find(
                (x: any) => x.idEmployee === employee.idEmployee
            );

            const zone = (() => {
                switch (item.idZone) {
                    case 1:
                        return "0001";
                    case 2:
                        return "0002";
                    case 3:
                        return "0006";
                    case 4:
                        return "0003";
                    case 5:
                        return "0004";
                    default:
                        return "0005";
                }
            })();

            const sex = item.Sex ? "M" : "F";

            worksheet!.getCell(`B${count0}`).value = item.idEmployee;
            worksheet!.getCell(`D${count0}`).value = "001-125-45488-1";
            worksheet!.getCell(`E${count0}`).value = "zxcmnbtyu";
            worksheet!.getCell(
                `F${count0}`
            ).value = `${item.FirstName} ${item.MiddleName}`;
            worksheet!.getCell(`G${count0}`).value = "Yeduin G";
            worksheet!.getCell(`H${count0}`).value = "Yeduin H";
            worksheet!.getCell(`I${count0}`).value = "Yeduin I";
            worksheet!.getCell(`J${count0}`).value = "Yeduin J";
            worksheet!.getCell(`K${count0}`).value = "Yeduin K";
            worksheet!.getCell(`L${count0}`).value = "Yeduin L";
            worksheet!.getCell(`M${count0}`).value = "Yeduin M";
            worksheet!.getCell(`O${count0}`).value = "Yeduin O";
            worksheet!.getCell(`P${count0}`).value = "Yeduin P";
            worksheet!.getCell(`Q${count0}`).value = "Yeduin Q";
            worksheet!.getCell(`R${count0}`).value = "Yeduin R";
            worksheet!.getCell(`S${count0}`).value = "Yeduin S";
            worksheet!.getCell(`T${count0}`).value = "Yeduin T";
            worksheet!.getCell(`AF${count0}`).value = "Yeduin AF";
            worksheet!.getCell(`AG${count0}`).value = "Yeduin AG";
            count0++;
        });

        const buffer = await workbook.xlsx.writeBuffer();

        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    const GenerateFile = async () => {
        await modifyExcelFile(mockData, "TemplateDGT.xlsx", "Plantilla DGT2");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <div>
                <Button onClick={GenerateFile} loading={isLoading}>
                    {isLoading ? (
                        <i
                            className="pi pi-spin pi-spinner"
                            style={{ marginRight: "0.5rem" }}
                        ></i>
                    ) : null}
                    Generate
                </Button>
            </div>
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
                    field="departament"
                    header="Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="Departamento!"
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
