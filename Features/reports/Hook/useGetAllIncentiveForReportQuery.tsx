import { useMutation } from "@tanstack/react-query";
import { incentiveForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllIncentiveForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            incentiveForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllIncentiveForReportQuery;
