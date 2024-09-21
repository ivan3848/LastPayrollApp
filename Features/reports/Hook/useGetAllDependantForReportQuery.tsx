import { useMutation } from "@tanstack/react-query";
import { dependantForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllDependantForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            dependantForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllDependantForReportQuery;
