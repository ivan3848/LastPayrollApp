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
import useInsuranceForReportQuery from "../Hook/useInsuranceForReportQuery";
import IFilterReport from "../Types/IFilterReport";
import { IIncentiveForReport } from "../Types/IIncentiveForReport";
import { IInsuranceForReport } from "../Types/IInsuranceForReport";

interface Props {
    filterValues: IFilterReport | null;
    setFilterValues: (value: IFilterReport | null) => void;
}
const InsuranceForReportTable = ({ filterValues, setFilterValues }: Props) => {
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

    const { data, isLoading } = useInsuranceForReportQuery(
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
        const text = "Reporte de Seguro Medico";
        const textWidth = doc.getTextWidth(text);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(text, textX, 16);
        autoTable(doc, {
            head: [
                [
                    //"Código Seguro",
                    //"Código Empleado",
                    "Titular",
                    "Dependiente",
                    "Cédula dependiente",
                    //"ID Concepto",
                    "Código de Concepto",
                    "Concepto",
                    "Seguro",
                    "Plan",
                    "Centro de Costo",
                    //"ID Cuenta contable",
                    //"ID Centro costo",
                    "Numero de cuenta",
                    "Cuenta contable",
                    "Porcentaje a Descontar",
                    "Monto",
                ],
            ],
            body: data?.items.map((item) => [
                //item.idInsurance,
                //item.idEmployee,
                item.employeeName,
                item.fullNameDependant,
                item.identificationDisplay,
                //item.idConcept,
                item.conceptCode,
                item.conceptName,
                item.description,
                item.planType,
                item.costCenter,
                //item.idAccountingAccount,
                //item.idCostCenter,
                item.accountNumber,
                item.accountingAccount,
                item.percentDiscount,
                item.amount,
            ]),
            startY: 20,
        });
        doc.save("ReporteSeguroMedico.pdf");
    };

    const exportXLSX = () => {
        const insuranceWithoutIdentifier = data.items.map(
            ({ identifier, ...rest }) => rest
        );

        const renamed = insuranceWithoutIdentifier.map((insurance) => {
            return {
                //"Código Seguro": insurance.idInsurance ?? "N/A",
                //"Código Empleado": insurance.idEmployee ?? "N/A",
                Titular: insurance.employeeName ?? "N/A",
                Dependiente: insurance.fullNameDependant ?? "N/A",
                "Cédula dependiente": insurance.identificationDisplay ?? "N/A",
                //"ID Concepto": insurance.idConcept ?? "N/A",
                "Código de Concepto": insurance.conceptCode ?? "N/A",
                Concepto: insurance.conceptName ?? "N/A",
                Seguro: insurance.description ?? "N/A",
                Plan: insurance.planType ?? "N/A",
                "Centro de Costo": insurance.costCenter ?? "N/A",
                //"ID Cuenta contable": insurance.idAccountingAccount ?? "N/A",
                //"ID Centro costo": insurance.idCostCenter ?? "N/A",
                "Numero de cuenta": insurance.accountNumber ?? "N/A",
                "Cuenta contable": insurance.accountingAccount ?? "N/A",
                "Porcentaje a Descontar": `${insurance.percentDiscount}%`,
                Monto:
                    insurance.amount.toLocaleString("es-DO", {
                        style: "currency",
                        currency: "DOP",
                    }) ?? "N/A",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(renamed);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "InsuranceForReport.xlsx");
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <h2
                className="m-0 mx-auto text-center"
                style={{ color: "#334155" }}
            >
                Reporte de Seguro Medico
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
                id="InsuranceForReport-Table"
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
                    field="idInsurance"
                    header="Código Seguro"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idInsurance"
                    filterPlaceholder="Buscar por código seguro"
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
                    hidden
                    filterField="idEmployee"
                    filterPlaceholder="Buscar por código empleado"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="employeeName"
                    header="Titular"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="employeeName"
                    filterPlaceholder="Buscar por titular"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="identificationDisplay"
                    header="Cédula dependiente"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="identificationDisplay"
                    filterPlaceholder="Buscar por cédula dependiente"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idConcept"
                    header="ID Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    hidden
                    filterField="idConcept"
                    filterPlaceholder="Buscar por ID Concepto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="conceptName"
                    header="Concepto"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="conceptName"
                    filterPlaceholder="Buscar por concepto"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
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
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="planType"
                    header="Plan"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="planType"
                    filterPlaceholder="Buscar por plan"
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
                    field="idAccountingAccount"
                    header="ID Cuenta contable"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idAccountingAccount"
                    filterPlaceholder="Buscar por ID Cuenta contable"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="idCostCenter"
                    header="ID Centro costo"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    hidden
                    filter
                    filterField="idCostCenter"
                    filterPlaceholder="Buscar por ID Centro costo"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>
                <Column
                    field="accountNumber"
                    header="Numero de cuenta"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountNumber"
                    filterPlaceholder="Buscar por numero de cuenta"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="accountingAccount"
                    header="Cuenta contable"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="accountingAccount"
                    filterPlaceholder="Buscar por cuenta contable"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                ></Column>

                <Column
                    field="percentDiscount"
                    header="Porcentaje a Descontar"
                    headerStyle={{ minWidth: "15rem" }}
                    sortable
                    filter
                    filterField="percentDiscount"
                    filterPlaceholder="Buscar por porcentaje a descontar"
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IInsuranceForReport) =>
                        rowData.percentDiscount
                            ? `${rowData.percentDiscount}%`
                            : "N/A"
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
                    showFilterMenuOptions
                    onFilterApplyClick={(e) => onFilter(e.field)}
                    onFilterClear={clearFilters}
                    body={(rowData: IInsuranceForReport) =>
                        rowData.amount.toLocaleString("es-DO", {
                            style: "currency",
                            currency: "DOP",
                        }) ?? "N/A"
                    }
                ></Column>
            </DataTable>
        </div>
    );
};

export default InsuranceForReportTable;
