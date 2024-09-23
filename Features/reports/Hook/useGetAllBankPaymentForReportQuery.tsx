import { useMutation } from "@tanstack/react-query";
import { bankPaymentForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllBankPaymentForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            bankPaymentForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllBankPaymentForReportQuery;
