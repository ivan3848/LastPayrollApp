"use client";

import DeleteEntity from "@/components/Shared/components/DeleteEntity";
import useCrudModals from "@/components/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { ICountry } from "../Types/ICountry";
import AddCountry from "./AddCountry";
import CountryTable from "./CountryTable";
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

    return (
        <div className="grid">
            <div className="w-full">
                <div className="card">
                    <Toast ref={toast} />

                    <CountryTable
                        submitted={submitted}
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
