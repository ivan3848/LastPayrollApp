"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import Loading from "@/app/loading";

const UserTable = dynamic(
    () => import("@/Features/UserConfiguration/Components/UserTable"),
    {
        loading: () => <Loading />,
    }
);
const Region = dynamic(() => import("../../region/Components/Region"), {
    loading: () => <Loading />,
});

const LocationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel header="One" leftIcon="pi pi-globe mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <UserTable submitted={false} />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Región" leftIcon="pi pi-map mr-2">
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
