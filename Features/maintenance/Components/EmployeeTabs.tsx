"use client";

import dynamic from "next/dynamic";
import { TabPanel, TabView } from "primereact/tabview";
import { Suspense } from "react";
import { AiFillContainer, AiFillIdcard } from "react-icons/ai";
import { CiBank } from "react-icons/ci";
import { FaFileContract } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import TabSkeletonTemplate from "../../Shared/Components/TabSkeletonTemplate";
import { PiIdentificationCardFill } from "react-icons/pi";

const ContractStatus = dynamic(
    () => import("../../status/Components/ContractStatus/ContractStatus")
);
const Bank = dynamic(() => import("../../bank/Components/Bank"));
const Education = dynamic(() => import("../../education/Components/Education"));
const CancelationTypeStatus = dynamic(
    () =>
        import(
            "../../status/Components/CancelationTypeStatus/CancelationTypeStatus"
        )
);
const MaritalStatus = dynamic(
    () => import("../../status/Components/MaritalStatus/MaritalStatus")
);
const CancelationReasonStatus = dynamic(
    () =>
        import(
            "../../status/Components/CancelationReasonStatus/CancelationReasonStatus"
        )
);

const EmployeeTabs = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView scrollable>
                    <TabPanel
                        header="Bancos"
                        leftIcon={<CiBank className="mr-2" size={18} />}
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Bank />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Niveles educativos"
                        leftIcon={<IoMdSchool className="mr-2" size={18} />}
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <Education />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Estado civil"
                        leftIcon={<AiFillIdcard className="mr-2" size={18} />}
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <MaritalStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Horarios de trabajo"
                        leftIcon={
                            <RiCalendarScheduleFill
                                className="mr-2"
                                size={18}
                            />
                        }
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            {/* <MaritalStatus /> */}
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Medidas de contratación"
                        leftIcon={<FaFileContract className="mr-2" size={18} />}
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <ContractStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Motivos de desvinculación"
                        leftIcon={
                            <AiFillContainer className="mr-2" size={18} />
                        }
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <CancelationReasonStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Nacionalidades"
                        leftIcon={
                            <PiIdentificationCardFill
                                className="mr-2"
                                size={18}
                            />
                        }
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <CancelationReasonStatus />
                        </Suspense>
                    </TabPanel>
                    <TabPanel
                        header="Tipos De Desvinculaciones"
                        leftIcon={<SiBookstack className="mr-2" size={18} />}
                    >
                        <Suspense fallback={<TabSkeletonTemplate />}>
                            <CancelationTypeStatus />
                        </Suspense>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default EmployeeTabs;
