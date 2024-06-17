"use client";

import dynamic from "next/dynamic";
import { TabPanel, TabView } from "primereact/tabview";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const ContractStatus = dynamic(
    () => import("../../status/Components/ContractStatus/ContractStatus")
);
const ContractType = dynamic(
    () => import("../../contractType/Components/ContractType")
);
const CancelationTypeStatus = dynamic(
    () =>
        import(
            "../../status/Components/CancelationTypeStatus/CancelationTypeStatus"
        )
);
const CancelationReasonStatus = dynamic(
    () =>
        import(
            "../../status/Components/CancelationReasonStatus/CancelationReasonStatus"
        )
);
const EmployeeTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
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
