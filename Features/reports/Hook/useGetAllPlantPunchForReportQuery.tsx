import { useMutation } from "@tanstack/react-query";
import { plantPunchForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";

const useGetAllPlantPunchForReportQuery = () => {
    return useMutation({
        mutationFn: (entity: IFilterReport) =>
            plantPunchForReportService.getAllReports(entity),
        onError: (error: any) => {
            console.log(error);
        },
        onSuccess: () => {
            alert("Success");
        },
    });
};

export default useGetAllPlantPunchForReportQuery;
