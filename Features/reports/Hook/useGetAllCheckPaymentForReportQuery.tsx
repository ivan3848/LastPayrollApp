import { useMutation } from "@tanstack/react-query";
import { checkPaymentForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllCheckPaymentForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            checkPaymentForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllCheckPaymentForReportQuery;
