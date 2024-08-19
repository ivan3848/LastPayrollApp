"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import AddVacation from "./AddVacation";
import EditVacation from "./EditVacation";
import VacationTable from "./VacationTable";
import { IEmployee } from "../../Types/IEmployee";

interface props {
    employeeEntity: IEmployee;
}

const Vacation = ({ employeeEntity }: props) => {
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
    } = useCrudModals<IVacation>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IVacation) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IVacation) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Fecha Inicio",
        "Fecha Final",
        "Dias de absentismo",
        "Dias a Pagar",
        "Dias de disfrute",
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
                    <VacationTable
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        idEmployee={employeeEntity.idEmployee}
                    />
                </Suspense>

                {editEntityDialog && (
                    <EditVacation
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}

                {addEntityDialog && (
                    <AddVacation
                        entity={employeeEntity}
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        handleAdd={handleAdd}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idVacation ?? 0}
                        endpoint="employee/vacation"
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

export default Vacation;
