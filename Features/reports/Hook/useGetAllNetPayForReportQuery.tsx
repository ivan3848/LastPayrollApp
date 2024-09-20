import { useMutation } from "@tanstack/react-query";
import { netPayForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllNetPayForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            netPayForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllNetPayForReportQuery;
