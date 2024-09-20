import { CACHE_KEY_DEPENDANT_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { dependantForReportService } from "../Services/reportService";
import { IDependantForReport } from "../Types/IDependantForReport";
import IFilterReport from "../Types/IFilterReport";

const useDependantForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IDependantForReport>, Error>({
        queryKey: [CACHE_KEY_DEPENDANT_FOR_REPORT, filterReport, params],
        queryFn: () =>
            dependantForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useDependantForReportQuery;
