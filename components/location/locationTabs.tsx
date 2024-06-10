"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../Shared/Components/TabSkeletonTemplate";

const Country = dynamic(() => import("../country/Components/Country"));
const Region = dynamic(() => import("../region/Components/Region"));

const LocationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel header="País" leftIcon="pi pi-map mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Country />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Región" rightIcon="pi pi-user ml-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Region />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default LocationTabs;
