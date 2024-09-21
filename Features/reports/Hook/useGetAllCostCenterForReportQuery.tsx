import { useMutation } from "@tanstack/react-query";
import { costCenterForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllCostCenterForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            costCenterForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllCostCenterForReportQuery;
