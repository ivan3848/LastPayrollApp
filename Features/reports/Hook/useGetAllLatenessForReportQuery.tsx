import { useMutation } from "@tanstack/react-query";
import { latenessForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllLatenessForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            latenessForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllLatenessForReportQuery;
