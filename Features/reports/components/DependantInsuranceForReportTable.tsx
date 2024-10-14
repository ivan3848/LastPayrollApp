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
import useDependantInsuranceForReportQuery from "../Hook/useDependantInsuranceForReportQuery";
import IFilterReport from "../Types/IFilterReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const DependantInsuranceForReportTable = ({
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

    const { data, isLoading } = useDependantInsuranceForReportQuery(
        filterReport,
        params
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

    const exportPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const text = "Reporte de seguros dependientes";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Código Empleado",
                    "Empleado",
                    "Cedula Dependiente",
                    "Dependiente",
                    "Parentesco",
                    "Código Empleado Asegurado",
                    "Código Seguro",
                    "Seguro",
                    "% a descontar",
                    "Cantidad",
                    "Código de Concepto",
                    "Inicio",
                    "Final",
                ],
            ],
            body: data?.items.map((item) => [
                item.idEmployee,
                item.employeeName,
                item.dependantIdentification,
                item.fullNameDependant,
                item.statusDescription,
                item.idPersonInsurance,
                item.idInsurance,
                item.description,
                item.percentDiscount,
                item.amount,
                item.conceptCode,
                item.startDate,
                item.endDate,
            ]),
            startY: 20,
        });
        doc.save("ReporteSegurosDependiente.pdf");
    };

    const exportXLSX = () => {
        const dependantInsuranceWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = dependantInsuranceWithoutIdentifier.map(
            (dependantInsurance) => {
                return {
                    "Código Empleado": dependantInsurance.idEmployee ?? "N/A",
                    Empleado: dependantInsurance.employeeName ?? "N/A",
                    "Cedula Dependiente":
                        dependantInsurance.dependantIdentification ?? "N/A",
                    Dependiente: dependantInsurance.fullNameDependant ?? "N/A",
                    Parentesco: dependantInsurance.statusDescription ?? "N/A",
                    "Código Empleado Asegurado":
                        dependantInsurance.idPersonInsurance ?? "N/A",
                    "Código Seguro": dependantInsurance.idInsurance ?? "N/A",
                    Seguro: dependantInsurance.description ?? "N/A",
                    "% a descontar":
                        dependantInsurance.percentDiscount ?? "N/A",
                    Cantidad: dependantInsurance.amount ?? "N/A",
                    "Código de Concepto":
                        dependantInsurance.conceptCode ?? "N/A",
                    Inicio: dependantInsurance.startDate ?? "N/A",
                    Final: dependantInsurance.endDate ?? "N/A",
                };
            }
        );

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DependantInsuranceForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de seguros dependientes
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
                id="DependantInsuranceForReport-Table"
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
                    field="dependantIdentification"
                    header="Cedula Dependiente"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="dependantIdentification"
                    filterPlaceholder="Buscar por cedula dependiente"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="fullNameDependant"
                    header="Dependiente"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="fullNameDependant"
                    filterPlaceholder="Buscar por dependiente"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="statusDescription"
                    header="Parentesco"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="statusDescription"
                    filterPlaceholder="Buscar por parentesco"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idPersonInsurance"
                    header="Código Empleado Asegurado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idPersonInsurance"
                    filterPlaceholder="Buscar por código empleado asegurado"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idInsurance"
                    header="Código Seguro"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="idInsurance"
                    filterPlaceholder="Buscar por código seguro"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="description"
                    header="Seguro"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="description"
                    filterPlaceholder="Buscar por seguro"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="percentDiscount"
                    header="% a descontar"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="percentDiscount"
                    filterPlaceholder="Buscar por % a descontar"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="amount"
                    header="Cantidad"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="amount"
                    filterPlaceholder="Buscar por cantidad"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="conceptCode"
                    header="Código de Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptCode"
                    filterPlaceholder="Buscar por código de concepto"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="startDate"
                    header="Inicio"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="startDate"
                    filterPlaceholder="Buscar por fecha de inicio"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="endDate"
                    header="Final"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="endDate"
                    filterPlaceholder="Buscar por fecha final"
                    showFilterMenuOptions={false}
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default DependantInsuranceForReportTable;
