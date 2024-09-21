import { CACHE_KEY_NET_PAY_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { netPayForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { INetPayForReport } from "../Types/INetPayForReport";

const useNetPayForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<INetPayForReport>, Error>({
        queryKey: [CACHE_KEY_NET_PAY_FOR_REPORT, filterReport, params],
        queryFn: () =>
            netPayForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useNetPayForReportQuery;
