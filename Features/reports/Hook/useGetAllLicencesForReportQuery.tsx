import { useMutation } from "@tanstack/react-query";
import { licencesForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllLicencesForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            licencesForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllLicencesForReportQuery;
