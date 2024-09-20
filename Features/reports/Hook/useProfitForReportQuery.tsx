import { CACHE_KEY_PROFIT_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { profitForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IProfitForReport } from "../Types/IProfitForReport";

const useProfitForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IProfitForReport>, Error>({
        queryKey: [CACHE_KEY_PROFIT_FOR_REPORT, filterReport, params],
        queryFn: () =>
            profitForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useProfitForReportQuery;
