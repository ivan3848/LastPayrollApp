import { CACHE_KEY_PERMIT_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { permitForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IPermitForReport } from "../Types/IPermitForReport";

const usePermitForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IPermitForReport>, Error>({
        queryKey: [CACHE_KEY_PERMIT_FOR_REPORT, filterReport, params],
        queryFn: () =>
            permitForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default usePermitForReportQuery;
