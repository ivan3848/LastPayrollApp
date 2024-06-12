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
                    <TabPanel header="Departamento" leftIcon="pi pi-globe mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Department />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Unidad Organizacional"
                        leftIcon="pi pi-globe mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <OrganizationalUnit />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DepartmentTabs;
