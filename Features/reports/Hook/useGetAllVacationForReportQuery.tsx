import { useMutation } from "@tanstack/react-query";
import { vacationForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllVacationForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            vacationForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllVacationForReportQuery;
