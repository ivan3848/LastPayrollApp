"use client";
import WorkScheduler from "@/Features/workScheduler/Components/WorkScheduler";
import WorkSchedulerTable from "@/Features/workScheduler/Components/WorkSchedulerTable";
import { IWorkScheduler } from "@/Features/workScheduler/Types/IWorkScheduler";
import { useState } from "react";

export default function Page(entity: IWorkScheduler) {
    const [editing, setEditing] = useState(false);
    const [editedEntity, setEditedEntity] = useState(entity);
    return (
        <WorkSchedulerTable
            submitted={false}
            handleAdd={function (): void {
                throw new Error("Function not implemented.");
            }}
            handleEdit={function (entity: IWorkScheduler): void {
                throw new Error("Function not implemented.");
            }}
            handleDelete={function (entity: IWorkScheduler): void {
                throw new Error("Function not implemented.");
            }}
        />
    );
}
