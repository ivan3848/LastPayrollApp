import { useMutation } from "@tanstack/react-query";
import { leaseForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllLeaseForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            leaseForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllLeaseForReportQuery;
