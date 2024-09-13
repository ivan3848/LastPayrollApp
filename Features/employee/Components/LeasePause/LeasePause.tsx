"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense, useState } from "react";
import LeasePauseTable from "./LeasePauseTable";
import EditLeasePause from "./EditLeasePause";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useLeaseStore from "../Lease/store/useLeaseStore";
import LeaseTable from "../Lease/LeaseTable";
import AddLeasePause from "./AddLeasePause";

interface props {
    id: number;
}

const LeasePause = ({ id }: props) => {
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
    } = useCrudModals<ILeasePause>();

    const [showLeaseTable, setShowLeaseTable] = useState(false);
    const [showAddLeasePauseBtn, setShowAddLeasePauseBtn] = useState(true);

    const handleAddLeasePause = (entity: ILease) => {
        const entityToEdit = {
            idLease: entity.idLease,
            idEmployeeModify: entity.idEmployee,
            startPauseDate: entity.startDate,
            endPauseDate: entity.endDate,
            description: "",
        } as ILeasePause;

        setEntity(entityToEdit);
        setShowAddLeasePauseBtn(false);
        setShowLeaseTable(true);
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleAdd = () => {
        setShowAddLeasePauseBtn(false);
        setShowLeaseTable(true);
        setSubmitted(false);
        setEntity(entity);
    };

    const handleEdit = (entity: ILeasePause) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: ILeasePause) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };
    const entityProperties = [
        "Concepto",
        "Fecha Inicio",
        "Fecha Final",
        "Cantidad de horas",
        "Monto",
        "Pago",
        "Es para pago",
    ];
    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />

                {showLeaseTable ? (
                    <LeaseTable
                        setShowAddLeasePauseBtn={setShowAddLeasePauseBtn}
                        showAddLeasePauseBtn={showAddLeasePauseBtn}
                        handleAddLeasePause={handleAddLeasePause}
                        setShowLeaseTable={setShowLeaseTable}
                        showLeaseTable={showLeaseTable}
                        submitted={submitted}
                        idEmployee={id}
                    />
                ) : (
                    <Suspense
                        fallback={
                            <TableSkeletonTemplate items={entityProperties} />
                        }
                    >
                        <LeasePauseTable
                            showAddLeasePauseBtn={showAddLeasePauseBtn}
                            submitted={submitted}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            idEmployee={id}
                            handleAdd={handleAdd}
                        />
                    </Suspense>
                )}

                {editEntityDialog && (
                    <EditLeasePause
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}

                {addEntityDialog && (
                    <AddLeasePause
                        id={id}
                        entity={entity!}
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        handleAdd={handleAdd}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idLeasePause ?? 0}
                        endpoint="employee/leasepause"
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

export default LeasePause;
