import { useMutation } from "@tanstack/react-query";
import { dependantInsuranceForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllDependantInsuranceForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            dependantInsuranceForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllDependantInsuranceForReportQuery;
