"use client";

import dynamic from "next/dynamic";
import { TabPanel, TabView } from "primereact/tabview";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";

const Nationality = dynamic(
    () => import("../../nationality/Components/Nationality")
);
const Education = dynamic(() => import("../../education/Components/Education"));

const MaritalStatus = dynamic(
    () => import("../../status/Components/MaritalStatus/MaritalStatus")
);
const RelationshipStatus = dynamic(
    () =>
        import("../../status/Components/RelationshipStatus/RelationshipStatus")
);

const PersonalInformationTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Niveles educativos"
                        leftIcon="pi pi-graduation-cap mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Education />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Estado civil"
                        leftIcon="pi pi-id-card mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <MaritalStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Nacionalidades"
                        leftIcon="pi pi-globe mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Nationality />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Parentescos"
                        leftIcon="pi pi-address-book mr-2">

                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <RelationshipStatus />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default PersonalInformationTabs;
