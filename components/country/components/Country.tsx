"use client";

import DeleteEntity from "@/components/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/components/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/components/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { ICountry } from "../Types/ICountry";
import AddCountry from "./AddCountry";
import EditCountry from "./EditCountry";

const CountryTable = dynamic(() => import("./countryTable"));

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

    const entityProperties = ["País", "Acciones"];

    return (
        <div className="grid">
            <div className="w-full">
                <div className="card">
                    <Toast ref={toast} />

                    <Suspense
                        fallback={
                            <TableSkeletonTemplate items={entityProperties} />
                        }
                    >
                        <CountryTable
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddCountry
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}

                    {editEntityDialog && (
                        <EditCountry
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idCountry ?? 0}
                            endpoint="employee/country"
                            deleteEntityDialog={deleteEntityDialog}
                            setDeleteEntityDialog={setDeleteEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Country;
