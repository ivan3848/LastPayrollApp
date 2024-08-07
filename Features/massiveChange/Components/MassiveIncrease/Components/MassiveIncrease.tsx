import React from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import ExcelTable from "../../ExcelTable";

const MassiveIncrease = () => {
    return (
        <>
            <div className="inline-flex align-items-center justify-content-center gap-5">
                <Link
                    href="/massiveChange"
                    className="text-inherit"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <i className="cursor-pointer pi pi-arrow-left"></i>
                </Link>

                <h2 className="font-bold white-space-nowrap text-2xl">
                    Aumento Masivo
                </h2>
            </div>
            <ExcelTable />
        </>
    );
};

export default MassiveIncrease;
