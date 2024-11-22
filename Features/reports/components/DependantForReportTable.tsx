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
import useDependantForReportQuery from "../Hook/useDependantForReportQuery";
import IFilterReport from "../Types/IFilterReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const DependantForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading, refetch } = useDependantForReportQuery(
        filterReport,
        params
    );

    const updatedParams = {
        ...params,
        filter: { ...params.filter, pageSize: data?.totalCount ?? 0 },
    };

    const { data: excelData } = useDependantForReportQuery(
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
        const text = "Reporte Dependiente";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    "Nombre Completo",
                    "ID Dependiente",
                    "Estado",
                    "Nombre Completo del Dependiente",
                ],
            ],
            body: excelData?.items.map((item) => [
                item.employeeName,
                item.dependantIdentification,
                item.statusDescription,
                item.fullNameDependant,
            ]),
            startY: 20,
        });
        doc.save("ReporteDeDependiente.pdf");
    };

    const exportXLSX = async () => {
        await refetch();
        const dependantWithoutIdentifier = excelData.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = dependantWithoutIdentifier.map((dependant) => {
            return {
                "Nombre Completo": dependant.employeeName ?? "N/A",
                "ID Dependiente": dependant.dependantIdentification ?? "N/A",
                Estado: dependant.statusDescription ?? "N/A",
                "Nombre Completo del Dependiente":
                    dependant.fullNameDependant ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DependantForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte Dependiente
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
                id="DependantForReport-Table"
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
                    field="dependantIdentification"
                    header="ID Dependiente"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="dependantIdentification"
                    filterPlaceholder="Buscar por ID dependiente"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="statusDescription"
                    header="Estado"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="statusDescription"
                    filterPlaceholder="Buscar por estado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="fullNameDependant"
                    header="Nombre Completo del Dependiente"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="fullNameDependant"
                    filterPlaceholder="Buscar por nombre completo del dependiente"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default DependantForReportTable;
