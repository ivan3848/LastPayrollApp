"use client";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import TabSkeletonTemplate from "@/Features/Shared/Components/TabSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import LeasePause from "../LeasePause/LeasePause";
import AddLease from "./AddLease";
import EditLease from "./EditLease";
import LeaseTable from "./LeaseTable";
import Amortization from "../Amortization/Amortization";

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

    const handleAmortize = (entity: ILease) => {
        setEntity(entity);
        //setSubmitted(false);
        setAddEntityDialog(true);
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
                <TabView>
                    <TabPanel
                        header="Prestamos / Avances"
                        leftIcon="pi pi-clipboard mr-2"
                    >
                        <Suspense
                            fallback={
                                <TableSkeletonTemplate
                                    items={entityProperties}
                                />
                            }
                        >
                            <LeaseTable
                                handleAmortize={handleAmortize}
                                submitted={submitted}
                                handleAdd={handleAdd}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                idEmployee={id}
                            />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Suspensión de pago"
                        leftIcon="pi pi-user-minus mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <LeasePause id={id} />
                        </Suspense>
                    </TabPanel>
                </TabView>

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
