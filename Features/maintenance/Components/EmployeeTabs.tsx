"use client";

import dynamic from "next/dynamic";
import { TabPanel, TabView } from "primereact/tabview";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import Loading from "@/app/loading";

const ContractStatus = dynamic(
    () => import("../../status/Components/ContractStatus/ContractStatus"),
    {
        loading: () => <Loading />,
    }
);

const ContractType = dynamic(
    () => import("../../contractType/Components/ContractType"),
    {
        loading: () => <Loading />,
    }
);

const CancelationTypeStatus = dynamic(
    () =>
        import(
            "../../status/Components/CancelationTypeStatus/CancelationTypeStatus"
        ),
    {
        loading: () => <Loading />,
    }
);

const CancelationReasonStatus = dynamic(
    () =>
        import(
            "../../status/Components/CancelationReasonStatus/CancelationReasonStatus"
        ),
    {
        loading: () => <Loading />,
    }
);

const WorkScheduler = dynamic(
    () => import("../../workScheduler/Components/WorkScheduler"),
    {
        loading: () => <Loading />,
    }
);

const GroupManager = dynamic(
    () => import("../../groupManager/Components/GroupManager"),
    {
        loading: () => <Loading />,
    }
);

const EmployeeTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Horarios"
                        leftIcon="pi pi-calendar-clock mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <WorkScheduler />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Grupos" leftIcon="pi pi-sitemap mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <GroupManager />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Medidas de contratación"
                        leftIcon="pi pi-book mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <ContractStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Motivos de desvinculación"
                        leftIcon="pi pi-receipt mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <CancelationReasonStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Contratos"
                        leftIcon="pi pi-clipboard mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <ContractType />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Tipos de desvinculaciones"
                        leftIcon="pi pi-user-minus mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <CancelationTypeStatus />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default EmployeeTabs;
