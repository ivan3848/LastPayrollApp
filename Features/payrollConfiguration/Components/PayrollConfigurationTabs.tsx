"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import PayrollConfiguration from "./PayrollConfiguration";
import Bonification from "./BreakComponents/Bonification/Components/Bonification";
import SeniorityIncentive from "./BreakComponents/SeniorityIncentive/Components/SeniorityIncentive";
import PayrollArea from "@/Features/payrollArea/Components/PayrollArea";
import Loading from "@/app/loading";

const ISRBreak = dynamic(
    () => import("./BreakComponents/ISRBreak/Components/ISRBreak"),
    {
        loading: () => <Loading />,
    }
);

const PayrollConfigurationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel header="ISR" leftIcon="pi pi-globe mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <ISRBreak />
                        </Suspense>
                    </TabPanel>

                    {/* <TabPanel header="Bonificación" leftIcon="pi pi-globe mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Bonification />
                        </Suspense>
                    </TabPanel> */}
                    <TabPanel
                        header="Incentivo Vacional"
                        leftIcon="pi pi-globe mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <SeniorityIncentive />
                        </Suspense>
                    </TabPanel>

                    <TabPanel
                        header="Conceptos mayores"
                        leftIcon="pi pi-map mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <PayrollConfiguration />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Clave de nomina"
                        leftIcon="pi pi-key mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <PayrollArea />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default PayrollConfigurationTabs;
