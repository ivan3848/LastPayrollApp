"use client";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import FiredEmployeeContabilizationDialog from "./FiredEmployeeContabilizationDialog";
import FiredEmployeeContabilizationTable from "./FiredEmployeeContabilizationTable";
import { IFireEmployee } from "@/Features/employee/Components/FiredEmployee/Types/IFiredEmployee";


const FiredEmployeeContabilization = () => {
    const {
        addEntityDialog,
        setAddEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
    } = useCrudModals<IFireEmployee>();

    const handleFiredEmplyeeContabilization = (entity: IFireEmployee) => {
        setEntity(entity);
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const entityProperties = [
        "Concepto",
        "Doctor",
        "Doctor Exequatur",
        "Descripción",
        "Fecha Inicio",
        "Fecha Final"
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
                    {<FiredEmployeeContabilizationTable
                        submitted={submitted}
                        handleFiredEmployeeContabilization={handleFiredEmplyeeContabilization}
                    />}
                </Suspense>
                {addEntityDialog && (
                    <FiredEmployeeContabilizationDialog
                        entity={entity!}
                        firedEmployeeEntityDialog={addEntityDialog}
                        setFiredEmployeeEntityDialog={setAddEntityDialog}
                        toast={toast}
                        setSubmitted={setSubmitted}
                    />
                )}
            </div>
        </div>
    );
};

export default FiredEmployeeContabilization;
