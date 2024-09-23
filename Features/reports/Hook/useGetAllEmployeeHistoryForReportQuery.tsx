import { useMutation } from "@tanstack/react-query";
import { employeeHistoryForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllEmployeeHistoryForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            employeeHistoryForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllEmployeeHistoryForReportQuery;
