import { CACHE_KEY_DEPARTMENT_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { departmentForReportService } from "../Services/reportService";
import { IDepartmentForReport } from "../Types/IDepartmentForReport";
import IFilterReport from "../Types/IFilterReport";

const useDepartmentForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IDepartmentForReport>, Error>({
        queryKey: [CACHE_KEY_DEPARTMENT_FOR_REPORT, filterReport, params],
        queryFn: () =>
            departmentForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useDepartmentForReportQuery;
