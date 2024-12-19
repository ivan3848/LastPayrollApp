"use client";
import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import Loading from "@/app/loading";

const OrganizationalUnit = dynamic(
    () => import("@/Features/organizationalUnit/Components/OrganizationalUnit"),
    {
        loading: () => <Loading />,
    }
);
const Department = dynamic(
    () => import("@/Features/departments/Components/Department"),
    {
        loading: () => <Loading />,
    }
);
const Position = dynamic(
    () => import("@/Features/position/Components/Position"),
    {
        loading: () => <Loading />,
    }
);
const HierarchyPosition = dynamic(
    () => import("@/Features/hierarchyPosition/Components/HierarchyPosition"),
    {
        loading: () => <Loading />,
    }
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
                        leftIcon="pi pi-objects-column mr-2"
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Department />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Posición" leftIcon="pi pi-link mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Position />
                        </Suspense>
                    </TabPanel>
                    <TabPanel header="Vacantes" leftIcon="pi pi-user-plus mr-2">
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <HierarchyPosition />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DepartmentTabs;
