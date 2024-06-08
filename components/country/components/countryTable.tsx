import IResponse from "@/types/IResponse";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { ICountry } from "../Types/ICountry";

interface Props {
    data: IResponse<ICountry>;
    setPage: (value: number) => void;
    setPageSize: (value: number) => void;
    setGlobalFilter: (value: string) => void;
    handleAdd: () => void;
    handleEdit: (entity: ICountry) => void;
    handleDelete: (entity: ICountry) => void;
}

const CountryTable = ({
    data,
    setPage,
    setPageSize,
    handleDelete,
    handleEdit,
    handleAdd,
}: Props) => {
    const [globalFilter, setGlobalFilter] = useState("");

    const nameBodyTemplate = (rowData: ICountry) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const actionBodyTemplate = (rowData: ICountry) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="mr-2"
                    rounded
                    severity="info"
                    onClick={() => handleEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="secondary"
                    onClick={() => handleDelete(rowData)}
                />
            </>
        );
    };

    const onPage = (event: DataTablePageEvent) => {
        setPage(event.page! + 1);
        setPageSize(event.rows);
    };

    const calculateFirstRow = (
        pageNumber: number,
        pageSize: number
    ): number => {
        return (pageNumber - 1) * pageSize;
    };

    const onGlobalFilterChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setGlobalFilter(event.target.value);
    };
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">Países</h3>

            <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                <span className="p-input-icon-right">
                    <InputText
                        type="search"
                        value={globalFilter || ""}
                        placeholder="Buscar"
                        onChange={(e) => onGlobalFilterChange(e)}
                    />
                    <i className="pi pi-search" />
                </span>
            </div>
            <Button
                label="Agregar"
                icon="pi pi-plus"
                severity="info"
                className="mr-2"
                onClick={handleAdd}
            />
        </div>
    );

    return (
        <DataTable
            globalFilterFields={["name"]}
            id="Country-Table"
            dataKey="idCountry"
            value={data?.items}
            lazy
            filterDisplay="menu"
            paginator
            globalFilter={globalFilter}
            globalFilterMatchMode="contains"
            totalRecords={data?.totalCount}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            emptyMessage="No hay registros."
            header={header}
            onPage={onPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            rows={data?.pageSize!}
            first={calculateFirstRow(data?.page!, data?.pageSize!)}
            currentPageReportTemplate="Mostrando del {first} a {last} de {totalRecords}"
        >
            <Column
                field="name"
                filterField="name"
                header="País"
                body={nameBodyTemplate}
                headerStyle={{ minWidth: "15rem" }}
                sortable
                filter
                filterPlaceholder="Buscar por nombre"
            ></Column>
            <Column
                header="Acciones"
                body={actionBodyTemplate}
                headerStyle={{ minWidth: "10rem" }}
            ></Column>
        </DataTable>
    );
};

export default CountryTable;
