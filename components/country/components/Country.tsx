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
import CountryTable from "./CountryTable";

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
    } = useCrudModals<ICountry>();
    const { setPage, setPageSize, setGlobalFilter, params } = useParamFilter();

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

    return (
        <div className="grid">
            <div className="w-full">
                <div className="card">
                    <Toast ref={toast} />

                    <CountryTable
                        data={data}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        setGlobalFilter={setGlobalFilter}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />

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
