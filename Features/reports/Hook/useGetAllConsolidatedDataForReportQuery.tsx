import { useMutation } from "@tanstack/react-query";
import { consolidatedDataForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllConsolidatedDataForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            consolidatedDataForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllConsolidatedDataForReportQuery;
