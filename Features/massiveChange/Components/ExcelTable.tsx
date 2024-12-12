import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { useRef, useState } from "react";
import useExcelTable from "../Hooks/useExcelTable";
import { getTableColumnName } from "../Types/ColumnTranslations";
import { Button } from "primereact/button";

type Props = {
    type: string[];
    handleUpload: (
        data: any[],
        name: string,
        date: string,
        clear: () => void
    ) => void;
    notExistedEmployeeData: any[];
    isExistEmployee: boolean;
    setIsExistEmployee: (value: boolean) => void;
    setNotExistedEmployeeData: (value: any[]) => void;
};

export default function ExcelTable({
    type,
    handleUpload,
    notExistedEmployeeData,
    setIsExistEmployee,
}: Props) {
    const { setSorts, clearSorts, params } = useParamFilter(8);
    const { excelData, onSelect, clearData, file } = useExcelTable();

    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const paginatedData = excelData.slice(
        currentPage * rowsPerPage,
        (currentPage + 1) * rowsPerPage
    );

    const onPage = (event: DataTablePageEvent) => {
        setCurrentPage(event.page!);
        setRowsPerPage(event.rows);
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

    const formatDate = (dateWithoutFormat: any): string => {
        const date = new Date(dateWithoutFormat);
        return date.toISOString().slice(0, 10);
    };

    const fileUploadRef = useRef<FileUpload>(null);

    return (
        <div className="m-1">
            <div className="mb-3">
                {notExistedEmployeeData.length > 0 && (
                    <Button
                        icon="pi pi-external-link"
                        className="p-button p-button-rounded p-button-outlined"
                        label="Ver empleados no existentes"
                        onClick={() => setIsExistEmployee(true)}
                    />
                )}
                <FileUpload
                    ref={fileUploadRef}
                    name="demo[]"
                    customUpload
                    uploadHandler={() =>
                        handleUpload(
                            excelData,
                            file.name,
                            file.lastModifiedDate ? formatDate(file.lastModifiedDate) : "",
                            () => fileUploadRef?.current?.clear()
                        )
                    }
                    onSelect={(e) => onSelect(e, type)}
                    onClear={clearData}
                    accept=".xls,.xlsx"
                    maxFileSize={1000000}
                    chooseLabel="Seleccionar archivo"
                    onRemove={clearData}
                    emptyTemplate={<p className="m-0">Seleccione el archivo deseado.</p>}
                />
            </div>

            <DataTable
                id="Excel-Table"
                value={paginatedData}
                lazy
                paginator
                onSort={onSort}
                removableSort
                sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
                sortMode="single"
                totalRecords={excelData?.length}
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                emptyMessage="No hay registros para mostrar."
                onPage={onPage}
                rowsPerPageOptions={[5, 10, 25]}
                rows={rowsPerPage}
                first={currentPage * rowsPerPage}
                currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
            >
                {type.map((element: string, index: number) => (
                    <Column
                        key={index}
                        field={element.toLowerCase()}
                        header={
                            getTableColumnName(
                                element.charAt(0).toUpperCase() + element.slice(1)
                            ) ?? element.charAt(0).toUpperCase() + element.slice(1)
                        }
                        headerStyle={{ minWidth: "15rem" }}
                        sortable
                        body={(rowData) => {
                            const value = rowData[element.toLowerCase()];
                            return value instanceof Date
                                ? value.toISOString().slice(0, 10)
                                : value;
                        }}
                    />
                ))}
            </DataTable>
        </div>
    );
}

