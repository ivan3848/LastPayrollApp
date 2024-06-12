"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const BenefitPosition = dynamic(
    () => import("../../benefitPosition/Components/BenefitPosition")
);
const ToolWorkDefinition = dynamic(
    () => import("../../toolWorkDefinition/Components/ToolWorkDefinition")
);
const ToolWorkPosition = dynamic(
    () => import("../../toolWorkPosition/Components/ToolWorkPosition")
);

const AsignationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Beneficio de posición"
                        leftIcon="pi pi-gift mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <BenefitPosition />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Herramientas de trabajo"
                        leftIcon="pi pi-briefcase mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <ToolWorkDefinition />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Herramientas de posición"
                        leftIcon="pi pi-wrench mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <ToolWorkPosition />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default AsignationTabs;
