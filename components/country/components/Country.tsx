"use client";

import DeleteEntity from "@/components/Shared/components/DeleteEntity";
import useCrudModals from "@/components/Shared/Hooks/useCrudModals";
import useParamFilter from "@/components/Shared/Hooks/useParamFilter";
import type { Demo } from "@/types";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { useState } from "react";
import useCountryQuery from "../Hooks/useCountryQuery";
import { ICountry } from "../Types/ICountry";
import AddCountry from "./AddCountry";
import EditCountry from "./EditCountry";

const Country = () => {
    const {
        deleteEntityDialog,
        setDeleteEntityDialog,
        addEntityDialog,
        setAddEntityDialog,
        editEntityDialog,
        setEditEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
        dt,
    } = useCrudModals<ICountry>();
    const { setPage, setPageSize, params } = useParamFilter();

    const listOfDependencies: boolean[] = [submitted];
    const { data } = useCountryQuery(params, listOfDependencies);

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: ICountry) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: ICountry) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

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
                    severity="warning"
                    onClick={() => handleEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="danger"
                    onClick={() => handleDelete(rowData)}
                />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h3 className="m-0">País</h3>
            <Button
                label="Agregar"
                icon="pi pi-plus"
                severity="success"
                className="mr-2"
                onClick={handleAdd}
            />
        </div>
    );

    const onPage = (event: DataTablePageEvent) => {
        console.log(event);
        setPage(event.page! + 1);
        setPageSize(event.rows);
    };

    const calculateFirstRow = (
        pageNumber: number,
        pageSize: number
    ): number => {
        return (pageNumber - 1) * pageSize;
    };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <DataTable
                        id="Country-Table"
                        dataKey="idCountry"
                        ref={dt}
                        value={data.items}
                        lazy
                        filterDisplay="menu"
                        paginator
                        totalRecords={data.totalCount}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        emptyMessage="No hay registros."
                        header={header}
                        onPage={onPage}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        rows={data.pageSize!}
                        first={calculateFirstRow(data.page!, data.pageSize!)}
                        currentPageReportTemplate="Mostrando del {first} a {last} de {totalRecords}"
                    >
                        <Column
                            field="name"
                            header="País"
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column>
                        <Column
                            header="Acciones"
                            body={actionBodyTemplate}
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                    </DataTable>

                    <AddCountry
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                    <EditCountry
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                    <DeleteEntity
                        id={entity?.idCountry ?? 0}
                        endpoint="employee/country"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                </div>
            </div>
        </div>
    );
};

export default Country;
