import { useMutation } from "@tanstack/react-query";
import { bankRelationshipForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllBankRelationshipForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            bankRelationshipForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllBankRelationshipForReportQuery;
