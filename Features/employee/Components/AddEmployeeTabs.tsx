"use client";

import { MenuItem } from "primereact/menuitem";
import { ScrollPanel } from "primereact/scrollpanel";
import { Steps } from "primereact/steps";
import { useState } from "react";

const AddEmployeeTabs = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const items: MenuItem[] = [
        {
            label: "Información Personal",
            icon: "pi pi-id-card",
            expanded: true,
        },
        {
            label: "Información Del Empleado",
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

    return (
        <div className="col-12">
            <h5>Agregar Empleado</h5>
            <div className="card">
                <Steps
                    model={items}
                    activeIndex={activeIndex}
                    onSelect={(e) => setActiveIndex(e.index)}
                    readOnly={false}
                />
                {activeIndex === 0 && <div>INFORMACIÓN PERSONAL</div>}
                {activeIndex === 1 && <div>INFORMACIÓN DEL EMPLEADO</div>}
            </div>
        </div>
    );
};

export default AddEmployeeTabs;
