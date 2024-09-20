import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import IFilterReport from "../Types/IFilterReport";
import { IFiredEmployeeForReport } from "../Types/IFiredEmployeeForReport";
import { CACHE_KEY_FIRED_EMPLOYEE_FOR_REPORT } from "@/constants/cacheKeys";
import { firedEmployeeForReportService } from "../Services/reportService";

const useFiredEmployeeForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IFiredEmployeeForReport>, Error>({
        queryKey: [CACHE_KEY_FIRED_EMPLOYEE_FOR_REPORT, filterReport, params],
        queryFn: () =>
            firedEmployeeForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useFiredEmployeeForReportQuery;
