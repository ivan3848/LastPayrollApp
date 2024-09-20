import { CACHE_KEY_VACATION_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { vacationForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IVacationForReport } from "../Types/IVacationForReport";

const useVacationForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IVacationForReport>, Error>({
        queryKey: [CACHE_KEY_VACATION_FOR_REPORT, filterReport, params],
        queryFn: () =>
            vacationForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useVacationForReportQuery;
