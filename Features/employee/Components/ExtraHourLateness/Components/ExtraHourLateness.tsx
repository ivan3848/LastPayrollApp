"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import ExtraHourLatenessTable from "./ExtraHourLatenessTable";
import AddExtraHourLateness from "./AddExtraHourLateness";
import EdiExtraHourLateness from "./EditExtraHourLateness";

interface props {
    id: number;
}

const ExtraHourLateness = ({ id }: props) => {
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
    } = useCrudModals<IExtraHourLateness>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IExtraHourLateness) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IExtraHourLateness) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Fecha",
        "Tipo",
        "Tipo de horas",
        "Horas",
    ];

    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />
                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    <ExtraHourLatenessTable
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        idEmployee={id}
                    />
                </Suspense>

                {editEntityDialog && (
                    <EdiExtraHourLateness
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}

                {addEntityDialog && (
                    <AddExtraHourLateness
                        id={id}
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        handleAdd={handleAdd}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idExtraHourLateness ?? 0}
                        endpoint="employee/extrahourlateness"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                )}
            </div>
        </div>
    );
};

export default ExtraHourLateness;
