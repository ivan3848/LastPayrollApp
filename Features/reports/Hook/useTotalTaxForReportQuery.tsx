import { CACHE_KEY_TOTAL_TAX_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { totalTaxForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { ITotalTaxForReport } from "../Types/ITotalTaxForReport";

const useTotalTaxForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<ITotalTaxForReport>, Error>({
        queryKey: [CACHE_KEY_TOTAL_TAX_FOR_REPORT, filterReport, params],
        queryFn: () =>
            totalTaxForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useTotalTaxForReportQuery;
