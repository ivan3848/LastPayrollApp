"use client";

import WorkScheduler from "@/Features/workScheduler/Components/WorkScheduler";
import { TabPanel, TabView } from "primereact/tabview";
import { CiBank } from "react-icons/ci";

const EmployeeChanges = () => {
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <TabView scrollable>
                    <TabPanel
                        header="Cambios"
                        leftIcon={<CiBank className="mr-2" size={18} />}
                    >
                        <WorkScheduler />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default EmployeeChanges;
