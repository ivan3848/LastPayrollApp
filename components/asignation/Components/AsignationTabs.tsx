"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const LocationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel header="País" leftIcon="pi pi-globe mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            {/* <Country /> */}
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default LocationTabs;
