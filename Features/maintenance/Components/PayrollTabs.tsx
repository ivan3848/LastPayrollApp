"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const Concept = dynamic(() => import("../../concept/Components/Concept"));
const AccountingAccount = dynamic(
    () => import("../../accountingAccount/Components/AccountingAccount")
);

const CostCenter = dynamic(
    () => import("../../costCenter/Components/CostCenter")
);

const PayrollTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView scrollable>
                    {/* <TabPanel
                        header="Conceptos de nómina"
                        leftIcon="pi pi-wallet mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Concept />
                        </Suspense>
                    </TabPanel> */}
                    <TabPanel
                        header="Cuentas contables"
                        leftIcon="pi pi-book mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <AccountingAccount />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Centros de costos"
                        leftIcon="pi pi-database mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <CostCenter />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default PayrollTabs;
