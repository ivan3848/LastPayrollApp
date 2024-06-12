"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const Country = dynamic(() => import("../../country/Components/Country"));
const Region = dynamic(() => import("../../region/Components/Region"));
const City = dynamic(() => import("../../city/Components/City"));
const Province = dynamic(() => import("../../province/Components/Province"));
const Sector = dynamic(() => import("../../sector/Components/Sector"));
const Zone = dynamic(() => import("../../zone/Components/Zone"));
const Location = dynamic(() => import("../../location/Components/Location"));

const LocationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel header="País" leftIcon="pi pi-globe mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Country />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Región" leftIcon="pi pi-map mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Region />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Ciudad" leftIcon="pi pi-building mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <City />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Provincia" leftIcon="pi pi-send mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Province />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Sector" leftIcon="pi pi-compass mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Sector />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Zona" leftIcon="pi pi-map-marker mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Zone />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Ubicación" leftIcon="pi pi-link mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Location />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default LocationTabs;
