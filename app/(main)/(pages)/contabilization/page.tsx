"use client";
import Contabilization from "@/Features/contabilization/Components/Contabilization";
import FiredEmployeeContabilization from "@/Features/contabilization/Components/FiredEmployeeContabilization/FiredEmployeeContabilization";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";

const ContabilizationPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="card">
            <h4 className="mb-4">CONTABILIZACIÓN DE NÓMINA</h4>
            <div className="flex mb-2 gap-2 justify-content-end">
                <Button
                    onClick={() => setActiveIndex(0)}
                    className="w-2rem h-2rem p-0"
                    rounded
                    outlined={activeIndex !== 0}
                    label="1"
                />
                <Button
                    onClick={() => setActiveIndex(1)}
                    className="w-2rem h-2rem p-0"
                    rounded
                    outlined={activeIndex !== 1}
                    label="2"
                />
            </div>
            <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            >
                <TabPanel header="Contabilizar">
                    <Contabilization />
                </TabPanel>
                <TabPanel header="Desvincular">
                    <FiredEmployeeContabilization />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default ContabilizationPage;
