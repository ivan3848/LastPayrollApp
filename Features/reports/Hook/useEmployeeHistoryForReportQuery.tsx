import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { IEmployeeHistoryForReport } from "../Types/IEmployeeHistoryForReport";
import IFilterReport from "../Types/IFilterReport";
import { CACHE_KEY_EMPLOYEE_HISTORY_FOR_REPORT } from "@/constants/cacheKeys";
import { employeeHistoryForReportService } from "../Services/reportService";

const useEmployeeHistoryForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IEmployeeHistoryForReport>, Error>({
        queryKey: [CACHE_KEY_EMPLOYEE_HISTORY_FOR_REPORT, filterReport, params],
        queryFn: () =>
            employeeHistoryForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useEmployeeHistoryForReportQuery;
