"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IProfit } from "./Types/IProfit";
import ProfitTable from "./ProfitTable";
import EditProfit from "./EditProfit";
import AddProfit from "./AddProfit";
import { IEmployee } from "../../Types/IEmployee";

interface props {
    employee: IEmployee;
}

const Profit = ({ employee }: props) => {
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
    } = useCrudModals<IProfit>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IProfit) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IProfit) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = ["Concepto", "Monto", "Inicio", "Final"];

    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />

                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    <ProfitTable
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        idEmployee={employee.idEmployee!}
                    />
                </Suspense>

                {editEntityDialog && (
                    <EditProfit
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                        id={employee.idEmployee!}
                    />
                )}

                {addEntityDialog && (
                    <AddProfit
                        employee={employee!}
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        handleAdd={handleAdd}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idProfit ?? 0}
                        endpoint="employee/profit"
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

export default Profit;
