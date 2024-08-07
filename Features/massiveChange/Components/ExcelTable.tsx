import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import useExcelTable from "../Hooks/useExcelTable";

export default function ExcelTable() {
    const toast = useRef<Toast | null>(null);
    const { setPage, setPageSize, setSorts, clearSorts, params } =
        useParamFilter();
    const { excelData, firstElement, onSelect } = useExcelTable();

    const onUpload = () => {
        toast?.current?.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };

    const chooseOptions = {
        icon: "pi pi-upload",
        className: "custom-choose-btn p-button-rounded p-button-outlined",
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

    return (
        <>
            <div className="m-1">
                <div className="m-3">
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        url="/api/upload"
                        accept="image/*"
                        maxFileSize={1000000}
                        onUpload={onUpload}
                        onSelect={onSelect}
                        auto
                        chooseLabel="Subir archivo"
                        chooseOptions={chooseOptions}
                    />
                </div>
                <DataTable
                    id="Excel-Table"
                    value={excelData}
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
                    rows={excelData.length}
                    currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
                >
                    {excelData &&
                        firstElement.map((element: string, index: number) => (
                            <Column
                                key={index}
                                field={element.toLowerCase()}
                                header={
                                    element.charAt(0).toUpperCase() +
                                    element.slice(1)
                                }
                                headerStyle={{ minWidth: "15rem" }}
                                sortable
                            ></Column>
                        ))}
                </DataTable>
            </div>
        </>
    );
}
