import { CACHE_KEY_POSITION_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { positionForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IPositionForReport } from "../Types/IPositionForReport";

const usePositionForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IPositionForReport>, Error>({
        queryKey: [CACHE_KEY_POSITION_FOR_REPORT, filterReport, params],
        queryFn: () =>
            positionForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default usePositionForReportQuery;
