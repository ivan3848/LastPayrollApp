import { CACHE_KEY_CONCEPT_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { conceptForReportService } from "../Services/reportService";
import { IConceptForReport } from "../Types/IConceptForReport";
import IFilterReport from "../Types/IFilterReport";

const useConceptForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IConceptForReport>, Error>({
        queryKey: [CACHE_KEY_CONCEPT_FOR_REPORT, filterReport, params],
        queryFn: () =>
            conceptForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useConceptForReportQuery;
