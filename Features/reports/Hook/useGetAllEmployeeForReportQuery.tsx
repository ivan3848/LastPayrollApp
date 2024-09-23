import { useMutation } from "@tanstack/react-query";
import { employeeForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllEmployeeForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            employeeForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllEmployeeForReportQuery;
