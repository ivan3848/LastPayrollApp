import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import IFilterReport from "../Types/IFilterReport";
import { IIncentiveForReport } from "../Types/IIncentiveForReport";
import { CACHE_KEY_INCENTIVE_FOR_REPORT } from "@/constants/cacheKeys";
import { incentiveForReportService } from "../Services/reportService";

const useIncentiveForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IIncentiveForReport>, Error>({
        queryKey: [CACHE_KEY_INCENTIVE_FOR_REPORT, filterReport, params],
        queryFn: () =>
            incentiveForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useIncentiveForReportQuery;
