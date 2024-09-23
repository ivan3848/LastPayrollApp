import { useMutation } from "@tanstack/react-query";
import { retroactiveHoursForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllRetroactiveHoursForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            retroactiveHoursForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllRetroactiveHoursForReportQuery;
