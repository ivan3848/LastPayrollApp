import { CACHE_KEY_LATENESS_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { latenessForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { ILatenessForReport } from "../Types/ILatenessForReport";

const useLatenessForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<ILatenessForReport>, Error>({
        queryKey: [CACHE_KEY_LATENESS_FOR_REPORT, filterReport, params],
        queryFn: () =>
            latenessForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useLatenessForReportQuery;
