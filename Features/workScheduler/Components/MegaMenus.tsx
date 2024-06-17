import React from "react";
import { MegaMenu } from "primereact/megamenu";

export default function MegaMenus() {
    const items = [
        {
            label: "File",
            icon: "pi pi-fw pi-file",
            items: [],
        },
    ];

    return (
        <div className="card">
            <MegaMenu model={items} orientation="vertical" breakpoint="960px" />
        </div>
    );
}
