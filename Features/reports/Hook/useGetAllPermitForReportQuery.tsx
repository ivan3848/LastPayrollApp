import { useMutation } from "@tanstack/react-query";
import { permitForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllPermitForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            permitForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllPermitForReportQuery;
