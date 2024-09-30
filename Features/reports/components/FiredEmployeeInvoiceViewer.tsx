import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { IFiredEmployeeForReport } from "../Types/IFiredEmployeeForReport";
import { FiredEmployeeInvoice } from "./FiredEmployeeInvoice";

interface Props {
    data: IFiredEmployeeForReport[];
}
const FiredEmployeeInvoiceViewer = ({ data }: Props) => {
    return (
        <>
            <PDFViewer
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
            >
                <FiredEmployeeInvoice data={data} />
            </PDFViewer>
            ;
        </>
    );
};

export default FiredEmployeeInvoiceViewer;
