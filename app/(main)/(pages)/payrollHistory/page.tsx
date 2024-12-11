import PayrollHistory from "@/Features/PayrollHistory/Components/PayrollHistory";
import React from "react";

const page = () => {
    return (
        <div className="card">
            <h4 className="mb-4">HISTORIAL DE NÓMINA</h4>
            <PayrollHistory />
        </div>
    );
};

export default page;
