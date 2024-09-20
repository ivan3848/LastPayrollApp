import { useMutation } from "@tanstack/react-query";
import { positionForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllPositionForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            positionForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllPositionForReportQuery;
