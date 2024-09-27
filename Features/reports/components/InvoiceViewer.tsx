import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Invoice } from "./Invoice";

const InvoiceViewer = () => (
    <PDFViewer style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Invoice />
    </PDFViewer>
);

export default InvoiceViewer;
