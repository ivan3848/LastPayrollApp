import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { Column } from "primereact/column";
import {
    DataTable,
    DataTablePageEvent,
    DataTableSortEvent,
} from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { useRef } from "react";
import useExcelTable from "../Hooks/useExcelTable";
import massiveIncreaseService from "./MassiveIncrease/Services/massiveIncreaseService";
import { getTableColumnName } from "../Types/ColumnTranslations";

type Props = {
    type: string[];
    handleUpload: () => void;
};

export default function ExcelTable({ type, handleUpload }: Props) {
    const { setPage, setPageSize, setSorts, clearSorts, params } =
        useParamFilter();

    const { headers, excelData, onSelect, clearData, file } = useExcelTable();

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

    const fileUploadRef = useRef(null);

    // const uploadHandler = () => {
    //     excelData;
    //     //addEntity.mutate(excelData);
    // };
    console.log(file);
    return (
        <>
            <div className="m-1">
                <div className="mb-3">
                    <FileUpload
                        ref={fileUploadRef}
                        name="demo[]"
                        customUpload
                        uploadHandler={handleUpload}
                        onSelect={(e) => onSelect(e, type)}
                        onClear={clearData}
                        accept=".xls,.xlsx"
                        maxFileSize={1000000}
                        chooseLabel="Seleccionar archivo"
                        onRemove={clearData}
                        emptyTemplate={
                            <p className="m-0">
                                Seleccione el archivo deseado.
                            </p>
                        }
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
                        type.map((element: string, index: number) => (
                            <Column
                                key={index}
                                field={element.toLowerCase()}
                                header={
                                    getTableColumnName(
                                        element.charAt(0).toUpperCase() +
                                            element.slice(1)
                                    ) ??
                                    element.charAt(0).toUpperCase() +
                                        element.slice(1)
                                }
                                headerStyle={{
                                    minWidth: "15rem",
                                }}
                                sortable
                            ></Column>
                        ))}
                </DataTable>
            </div>
        </>
    );
}
