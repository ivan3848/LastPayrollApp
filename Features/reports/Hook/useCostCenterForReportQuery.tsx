import {
    CACHE_KEY_COST_CENTER_FOR_REPORT,
} from "@/constants/cacheKeys";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { costCenterForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { ICostCenterForReport } from "../Types/ICostCenterForReport";
import IParamsApi from "@/types/IParamApi";

const useCostCenterForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<ICostCenterForReport>, Error>({
        queryKey: [CACHE_KEY_COST_CENTER_FOR_REPORT, filterReport, params],
        queryFn: () =>
            costCenterForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useCostCenterForReportQuery;
