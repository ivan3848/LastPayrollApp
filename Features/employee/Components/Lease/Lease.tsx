"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import AddLease from "./AddLease";
import LeaseTable from "./LeaseTable";
import EditLease from "./EditLease";
import { TabPanel, TabView } from "primereact/tabview";

interface props {
    id: number;
}

const Lease = ({ id }: props) => {
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
    } = useCrudModals<ILease>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: ILease) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: ILease) => {
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
                        <TabView>
                            <TabPanel header="Préstamo / Avances">
                                <LeaseTable
                                    submitted={submitted}
                                    handleAdd={handleAdd}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    idEmployee={id}
                                />
                            </TabPanel>
                            <TabPanel header="Suspensión de pago">
                                klk2
                            </TabPanel>
                        </TabView>
                    </div>
                </Suspense>

                {editEntityDialog && (
                    <EditLease
                        setEditEntityDialog={setEditEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        entity={entity!}
                        editEntityDialog={editEntityDialog}
                    />
                )}

                {addEntityDialog && (
                    <AddLease
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
                        id={entity?.idLease ?? 0}
                        endpoint="employee/lease"
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

export default Lease;
