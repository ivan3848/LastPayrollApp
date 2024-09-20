import { useMutation } from "@tanstack/react-query";
import { conceptForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllConceptForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            conceptForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllConceptForReportQuery;
