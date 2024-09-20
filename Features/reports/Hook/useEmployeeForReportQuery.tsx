import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { IEmployeeForReport } from "../Types/IEmployeeForReport";
import IFilterReport from "../Types/IFilterReport";
import { CACHE_KEY_EMPLOYEE_FOR_REPORT } from "@/constants/cacheKeys";
import { employeeForReportService } from "../Services/reportService";

const useEmployeeForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IEmployeeForReport>, Error>({
        queryKey: [CACHE_KEY_EMPLOYEE_FOR_REPORT, filterReport, params],
        queryFn: () =>
            employeeForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useEmployeeForReportQuery;
