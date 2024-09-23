import { CACHE_KEY_CONSOLIDATE_DATA_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { IConsolidatedDataForReport } from "../Types/IConsolidatedDataForReport";
import IFilterReport from "../Types/IFilterReport";
import { consolidatedDataForReportService } from "../Services/reportService";

const useConsolidatedDataForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IConsolidatedDataForReport>, Error>({
        queryKey: [CACHE_KEY_CONSOLIDATE_DATA_FOR_REPORT, filterReport, params],
        queryFn: () =>
            consolidatedDataForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useConsolidatedDataForReportQuery;
