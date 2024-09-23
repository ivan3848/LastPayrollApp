import { CACHE_KEY_PUNCH_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { punchForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IPunchForReport } from "../Types/IPunchForReport";

const usePunchForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IPunchForReport>, Error>({
        queryKey: [CACHE_KEY_PUNCH_FOR_REPORT, filterReport, params],
        queryFn: () => punchForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default usePunchForReportQuery;
