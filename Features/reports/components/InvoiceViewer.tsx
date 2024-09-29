import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Invoice } from "./Invoice";
import { IGetPayrollExecution } from "@/Features/payrollPay/types/IGetPayrollExecution";

interface Props {
    data: IGetPayrollExecution[];
}
const InvoiceViewer = ({ data }: Props) => (
    <PDFViewer style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Invoice data={data} />
    </PDFViewer>
);

export default InvoiceViewer;
