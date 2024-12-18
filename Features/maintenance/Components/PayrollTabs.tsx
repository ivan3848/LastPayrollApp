"use client";

import dynamic from "next/dynamic";
import { TabPanel, TabView } from "primereact/tabview";
import { Suspense, useEffect } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import { useLoading } from "@/layout/context/loadingcontext";

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
const PaymentMethodStatus = dynamic(
    () =>
        import(
            "../../status/Components/PaymentMethodStatus/PaymentMethodStatus"
        )
);

const PayrollTabs = () => {
    const { isLoading, setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        //      Simulate a network request or some async operation
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Centros de costos"
                        leftIcon="pi pi-database mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <CostCenter />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Cuentas" leftIcon="pi pi-book mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <AccountingAccount />
                        </Suspense>
                    </TabPanel>
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
                    <TabPanel header="Conceptos" leftIcon="pi pi-wallet mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Concept />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Métodos de pago"
                        leftIcon="pi pi-money-bill mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <PaymentMethodStatus />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default PayrollTabs;
