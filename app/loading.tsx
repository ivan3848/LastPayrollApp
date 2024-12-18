import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

function loading() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }}
        >
            <ProgressSpinner />
        </div>
    );
}

export default loading;
