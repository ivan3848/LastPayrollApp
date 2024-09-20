import { CACHE_KEY_RETROACTIVE_HOURS_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { retroactiveHoursForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IRetroactiveHoursForReport } from "../Types/IRetroactiveHoursForReport";

const useRetroactiveHoursForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IRetroactiveHoursForReport>, Error>({
        queryKey: [
            CACHE_KEY_RETROACTIVE_HOURS_FOR_REPORT,
            filterReport,
            params,
        ],
        queryFn: () =>
            retroactiveHoursForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useRetroactiveHoursForReportQuery;
