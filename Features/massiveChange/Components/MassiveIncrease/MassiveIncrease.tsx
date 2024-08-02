import React from "react";
import Link from "next/link";

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

                <span className="font-bold white-space-nowrap text-2xl">
                    Aumento Masivo
                </span>
            </div>
        </>
    );
};

export default MassiveIncrease;
