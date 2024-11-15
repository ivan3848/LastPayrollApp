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
import usePositionForReportQuery from "../Hook/usePositionForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IPositionForReport } from "../Types/IPositionForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const PositionForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading } = usePositionForReportQuery(filterReport, params);
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
        const text = "Reporte de Posiciones";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    //"ID Posición",
                    "Nombre de la Posición",
                    "Salario Mínimo",
                    "Salario Máximo",
                    "Nombre del Departamento",
                    "Posiciones Ocupadas",
                    "Posiciones Disponibles",
                    "Numero de Posiciones",
                ],
            ],
            body: data?.items.map((item) => [
                //item.idPosition,
                item.positionName,
                item.minSalary,
                item.maxSalary,
                item.departmentName,
                item.filledPositions,
                item.availablePositions,
                item.numberOfPositions,
            ]),
            startY: 20,
        });
        doc.save("ReportePosiciones.pdf");
    };

    const exportXLSX = () => {
        const positionWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = positionWithoutIdentifier.map((position) => {
            return {
                //"ID Posición": position.idPosition ?? "N/A",
                "Nombre de la Posición": position.positionName ?? "N/A",
                "Salario Mínimo":
                    position.minSalary.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                "Salario Máximo":
                    position.maxSalary.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
                "Nombre del Departamento": position.departmentName ?? "N/A",
                "Posiciones Ocupadas": position.filledPositions ?? "N/A",
                "Posiciones Disponibles": position.availablePositions ?? "N/A",
                "Numero de Posiciones": position.numberOfPositions ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "PositionForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Posiciones
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
                id="PositionForReport-Table"
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
                    field="idPosition"
                    header="Código Posicion"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idPosition"
                    filterPlaceholder="Buscar por código posicion"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="positionName"
                    header="Posición"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="positionName"
                    filterPlaceholder="Buscar por nombre de la posición"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="minSalary"
                    header="Salario Mínimo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="minSalary"
                    filterPlaceholder="Buscar por salario mínimo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IPositionForReport) =>
                        rowData.minSalary
                            ? rowData.minSalary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="maxSalary"
                    header="Salario Máximo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="maxSalary"
                    filterPlaceholder="Buscar por salario máximo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IPositionForReport) =>
                        rowData.maxSalary
                            ? rowData.maxSalary.toLocaleString("es-DO", {
                                  style: "currency",
                                  currency: "DOP",
                              })
                            : "N/A"
                    }
                ></Column>
                <Column
                    field="departmentName"
                    header="Departamento"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="departmentName"
                    filterPlaceholder="Buscar por nombre del departamento"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="filledPositions"
                    header="Ocupadas"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="filledPositions"
                    filterPlaceholder="Buscar por posiciones ocupadas"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="availablePositions"
                    header="Disponibles"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="availablePositions"
                    filterPlaceholder="Buscar por posiciones disponibles"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="numberOfPositions"
                    header="Posiciones"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="numberOfPositions"
                    filterPlaceholder="Buscar por numero de posiciones"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
            </DataTable>
        </div>
    );
};

export default PositionForReportTable;
