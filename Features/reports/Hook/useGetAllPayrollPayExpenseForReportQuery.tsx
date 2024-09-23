import { useMutation } from "@tanstack/react-query";
import { payrollPayExpenseForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllPayrollPayExpenseForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            payrollPayExpenseForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllPayrollPayExpenseForReportQuery;
