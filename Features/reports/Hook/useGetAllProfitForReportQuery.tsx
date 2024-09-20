import { useMutation } from "@tanstack/react-query";
import { profitForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllProfitForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            profitForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllProfitForReportQuery;
