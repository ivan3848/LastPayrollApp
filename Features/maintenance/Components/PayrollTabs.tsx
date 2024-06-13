"use client";

import dynamic from "next/dynamic";
import { TabPanel, TabView } from "primereact/tabview";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const Concept = dynamic(() => import("../../concept/Components/Concept"));
const Bank = dynamic(() => import("../../bank/Components/Bank"));
const AccountingAccount = dynamic(
    () => import("../../accountingAccount/Components/AccountingAccount")
);
const CostCenter = dynamic(
    () => import("../../costCenter/Components/CostCenter")
);
const SalaryNewsStatus = dynamic(
    () => import("../../status/Components/SalaryNewsStatus/SalaryNewsStatus")
);

const PayrollTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Bancos"
                        leftIcon="pi pi-building-columns mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Bank />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Novedades Salariales"
                        leftIcon="pi pi-money-bill mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <SalaryNewsStatus />
                        </Suspense>
                    </TabPanel>
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
