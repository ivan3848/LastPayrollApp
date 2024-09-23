import { CACHE_KEY_COST_FOR_REPORT } from "@/constants/cacheKeys";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { costForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { ICostForReport } from "../Types/ICostForReport";
import IParamsApi from "@/types/IParamApi";

const useCostForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<ICostForReport>, Error>({
        queryKey: [CACHE_KEY_COST_FOR_REPORT, filterReport, params],
        queryFn: () => costForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useCostForReportQuery;
