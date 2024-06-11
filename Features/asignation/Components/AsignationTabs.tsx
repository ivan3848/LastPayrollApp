"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const BenefitPosition = dynamic(
    () => import("../../benefitPosition/Components/BenefitPosition")
);

const AsignationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Beneficio de posición"
                        leftIcon="pi pi-star mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <BenefitPosition />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default AsignationTabs;
