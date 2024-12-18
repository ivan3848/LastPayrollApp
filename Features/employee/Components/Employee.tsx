"use client";

import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import dynamic from "next/dynamic";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IEmployee } from "../Types/IEmployee";
import Loading from "../loading";

const EmployeeTable = dynamic(() => import("./EmployeeTable"), {
    loading: () => <Loading />,
});

const Employee = () => {
    const {
        deleteEntityDialog,
        setDeleteEntityDialog,
        entity,
        submitted,
        setSubmitted,
        toast,
    } = useCrudModals<IEmployee>();

    const skeleton = () => {
        return (
            <div className="border-round border-1 surface-border p-4 surface-card">
                <div className="flex mb-3">
                    <Skeleton
                        shape="circle"
                        size="4rem"
                        className="mr-2"
                    ></Skeleton>
                    <div>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                        <Skeleton height=".5rem"></Skeleton>
                    </div>
                </div>
                <Skeleton width="100%" height="150px"></Skeleton>
                <div className="flex justify-content-between mt-3">
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
        );
    };

    return (
        <div className="grid">
            <div className="w-full">
                <div>
                    <Toast ref={toast} />

                    <Suspense fallback={skeleton()}>
                        <EmployeeTable toast={toast} submitted={submitted} />
                    </Suspense>

                    {deleteEntityDialog && (
                        <DeleteEntity
                            id={entity?.idEmployee ?? 0}
                            endpoint="employee/employee"
                            deleteEntityDialog={deleteEntityDialog}
                            setDeleteEntityDialog={setDeleteEntityDialog}
                            setSubmitted={setSubmitted}
                            toast={toast}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Employee;
