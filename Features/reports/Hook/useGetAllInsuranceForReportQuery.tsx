import { useMutation } from "@tanstack/react-query";
import { insuranceForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllInsuranceForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            insuranceForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllInsuranceForReportQuery;
