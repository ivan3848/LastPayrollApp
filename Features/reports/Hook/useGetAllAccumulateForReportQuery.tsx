import { useMutation } from "@tanstack/react-query";
import { accumulateForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllAccumulateForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            accumulateForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllAccumulateForReportQuery;
