"use client";

import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { ISeniorityIncentiveBreak } from "../Types/ISeniorityIncentive";
import AddSeniorityIncentive from "./AddSeniorityIncentive";
import EditSeniorityIncentive from "./EditSeniorityIncentive";
import DeleteSeniorityIncentive from "./DeleteSeniorityIncentive";
import Loading from "@/app/loading";

const SeniorityIncentiveTable = dynamic(
    () => import("./SeniorityIncentiveTable"),
    {
        loading: () => <Loading />,
    }
);

const SeniorityIncentive = () => {
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
    } = useCrudModals<ISeniorityIncentiveBreak>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: ISeniorityIncentiveBreak) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: ISeniorityIncentiveBreak) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = ["Mínimo de años", "Dias a pagar", "Acciones"];

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
                        <SeniorityIncentiveTable
                            submitted={submitted}
                            handleAdd={handleAdd}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Suspense>

                    {addEntityDialog && (
                        <AddSeniorityIncentive
                            addEntityDialog={addEntityDialog}
                            setAddEntityDialog={setAddEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}

                    {editEntityDialog && (
                        <EditSeniorityIncentive
                            entity={entity!}
                            editEntityDialog={editEntityDialog}
                            setEditEntityDialog={setEditEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}

                    {deleteEntityDialog && (
                        <DeleteSeniorityIncentive
                            entity={entity!}
                            addEntityDialog={deleteEntityDialog}
                            setAddEntityDialog={setDeleteEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeniorityIncentive;
