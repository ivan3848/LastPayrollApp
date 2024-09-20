import { useMutation } from "@tanstack/react-query";
import { punchForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllPunchForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            punchForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllPunchForReportQuery;
