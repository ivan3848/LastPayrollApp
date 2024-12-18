"use client";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Skeleton } from "primereact/skeleton";
import { Suspense } from "react";
import { IEmployee } from "../../employee/Types/IEmployee";
import { TabPanel, TabView } from "primereact/tabview";
import TabSkeletonTemplate from "@/Features/Shared/Components/TabSkeletonTemplate";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const UserTable = dynamic(
    () => import("@/Features/UserConfiguration/Components/UserTable"),
    {
        loading: () => <Loading />,
    }
);

const UserTableWithLogin = dynamic(() => import("./UserTableWithLogin"), {
    loading: () => <Loading />,
});

const User = () => {
    const {
        deleteEntityDialog,
        setDeleteEntityDialog,
        entity,
        submitted,
        setSubmitted,
        setAddEntityDialog,
        addEntityDialog,
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
                    <TabView>
                        <TabPanel
                            header="Sin Login"
                            leftIcon="pi pi-globe mr-2"
                        >
                            <Suspense fallback={skeleton()}>
                                <UserTable submitted={submitted} />
                            </Suspense>
                        </TabPanel>
                        <TabPanel header="Con Login" leftIcon="pi pi-map mr-2">
                            <Suspense fallback={<TabSkeletonTemplate />}>
                                <UserTableWithLogin submitted={false} />
                            </Suspense>
                        </TabPanel>
                    </TabView>
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

export default User;
