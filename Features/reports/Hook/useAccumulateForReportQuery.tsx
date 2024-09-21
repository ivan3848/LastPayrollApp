import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { accumulateForReportService, payrollPayExpenseForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import IParamsApi from "@/types/IParamApi";
import { CACHE_KEY_ACCUMULATE_FOR_REPORT } from "@/constants/cacheKeys";
import { IAccumulateForReport } from "../Types/IAccumulateForReport";

const useAccumulateForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IAccumulateForReport>, Error>({
        queryKey: [CACHE_KEY_ACCUMULATE_FOR_REPORT, filterReport, params],
        queryFn: () =>
            accumulateForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useAccumulateForReportQuery;
