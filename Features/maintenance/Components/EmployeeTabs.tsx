"use client";

import { TabPanel, TabView } from "primereact/tabview";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import { LiaFileContractSolid } from "react-icons/lia";
import { CiBank } from "react-icons/ci";

const ContractStatus = dynamic(
    () => import("../../status/Components/ContractStatus/ContractStatus")
);
const Bank = dynamic(() => import("../../bank/Components/Bank"));

const EmployeeTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView>
                    <TabPanel
                        header="Medida de contratación"
                        leftIcon={
                            <LiaFileContractSolid className="mr-2" size={20} />
                        }
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <ContractStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Bancos"
                        leftIcon={<CiBank className="mr-2" size={20} />}
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Bank />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default EmployeeTabs;
