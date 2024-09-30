import { IGetFiredEmployeePreviewInformation } from "@/Features/employee/Components/FiredEmployee/Types/IGetFiredEmployeePreviewInformation";
import { PDFViewer } from "@react-pdf/renderer";
import { FiredEmployeePreviewInvoice } from "./FiredEmployeePreviewInvoice";

interface Props {
    data: IGetFiredEmployeePreviewInformation[];
}
const FiredEmployeePreviewInvoiceViewer = ({ data }: Props) => {
    return (
        <PDFViewer
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
        >
            <FiredEmployeePreviewInvoice data={data} />
        </PDFViewer>
    );
};

export default FiredEmployeePreviewInvoiceViewer;
