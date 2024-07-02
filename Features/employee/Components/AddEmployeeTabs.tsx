"use client";

import { MenuItem } from "primereact/menuitem";
import { Steps } from "primereact/steps";
import { useState } from "react";

const AddEmployeeTabs = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const items: MenuItem[] = [
        {
            label: "Información Personal",
            command: (event) => {},
        },
        {
            label: "Seat",
            command: (event) => {},
        },
        {
            label: "Payment",
            command: (event) => {},
        },
        {
            label: "Confirmation",
            command: (event) => {},
        },
    ];

    const test = () => {
        return <div>Test</div>;
    };

    return (
        <div className="card">
            <Steps
                model={items}
                activeIndex={activeIndex}
                onSelect={(e) => setActiveIndex(e.index)}
                readOnly={false}
            >
                {test()}
            </Steps>
        </div>
    );
};

export default AddEmployeeTabs;
