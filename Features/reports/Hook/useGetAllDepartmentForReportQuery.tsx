import { useMutation } from "@tanstack/react-query";
import { departmentForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllDepartmentForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            departmentForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllDepartmentForReportQuery;
