"use client";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import AddAmortization from "./AddAmortization";
import EditAmortization from "./EditAmortization";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";

interface props {
    id: number;
    customAddDialog: boolean;
    setCustomAddDialog: (customAddDialog: boolean) => void;
    customEntity: ILease;
}

const Amortization = ({
    id,
    customAddDialog,
    setCustomAddDialog,
    customEntity,
}: props) => {
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
    } = useCrudModals<IAmortization>();

    const handleAdd = (entity?: IAmortization) => {
        setEntity(entity!);
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IAmortization) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IAmortization) => {
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
                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    <div className="col-12">
                        {customAddDialog &&
                            !editEntityDialog &&
                            !deleteEntityDialog && (
                                <AddAmortization
                                    setCustomAddDialog={setCustomAddDialog}
                                    submitted={submitted}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    entity={entity!}
                                    id={id}
                                    addEntityDialog={customAddDialog}
                                    setAddEntityDialog={setAddEntityDialog}
                                    handleAdd={handleAdd}
                                    toast={toast}
                                    setSubmitted={setSubmitted}
                                    idConcept={customEntity.idConcept}
                                />
                            )}
                    </div>
                </Suspense>

                {editEntityDialog && (
                    <EditAmortization
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}
                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.idAmortization ?? 0}
                        endpoint="employee/amortization"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                )}
                {/* {addEntityDialog && (
                    <AddAmortization
                        entity={entity!}
                        id={id}
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        handleAdd={handleAdd}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )} }
                {/* {editEntityDialog && (
                    <EditAmortization
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}
                {addEntityDialog && (
                    <AddAmortization
                        entity={entity!}
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
                        id={entity?.idAmortization ?? 0}
                        endpoint="employee/lease"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                )} */}
            </div>
        </div>
    );
};

export default Amortization;
