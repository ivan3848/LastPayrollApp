import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { licencesForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { ILicencesForReport } from "../Types/ILicencesForReport";
import { CACHE_KEY_LICENCES_FOR_REPORT } from "@/constants/cacheKeys";

const useLicencesForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<ILicencesForReport>, Error>({
        queryKey: [CACHE_KEY_LICENCES_FOR_REPORT, filterReport, params],
        queryFn: () =>
            licencesForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useLicencesForReportQuery;
