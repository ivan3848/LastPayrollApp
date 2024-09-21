import { useMutation } from "@tanstack/react-query";
import { costForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllCostForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            costForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllCostForReportQuery;
