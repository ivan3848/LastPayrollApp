"use client";
import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import OrganizationalUnit from "@/Features/organizationalUnit/Components/OrganizationalUnit";

const Department = dynamic(
    () => import("@/Features/departments/Components/Department")
);

const DepartmentTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Unidad Organizacional"
                        leftIcon="pi pi-sitemap mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <OrganizationalUnit />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Departamento"
                        leftIcon="pi pi-warehouse mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Department />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DepartmentTabs;
