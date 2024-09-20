import { CACHE_KEY_EXTRA_HOUR_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { extrahourForReportService } from "../Services/reportService";
import { IExtraHourForReport } from "../Types/IExtraHourForReport";
import IFilterReport from "../Types/IFilterReport";

const useExtraHourForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IExtraHourForReport>, Error>({
        queryKey: [CACHE_KEY_EXTRA_HOUR_FOR_REPORT, filterReport, params],
        queryFn: () =>
            extrahourForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useExtraHourForReportQuery;
