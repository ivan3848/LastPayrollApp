import { useMutation } from "@tanstack/react-query";
import { extrahourForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllExtraHourForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            extrahourForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllExtraHourForReportQuery;
