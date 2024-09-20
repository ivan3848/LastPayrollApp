import { useMutation } from "@tanstack/react-query";
import { totalTaxForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllTotalTaxForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            totalTaxForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllTotalTaxForReportQuery;
