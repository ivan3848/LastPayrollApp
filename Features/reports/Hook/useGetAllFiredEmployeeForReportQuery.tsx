import { useMutation } from "@tanstack/react-query";
import { firedEmployeeForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllFiredEmployeeForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            firedEmployeeForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllFiredEmployeeForReportQuery;
