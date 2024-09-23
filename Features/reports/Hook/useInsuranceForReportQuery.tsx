import { CACHE_KEY_INSURANCE_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { insuranceForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IInsuranceForReport } from "../Types/IInsuranceForReport";

const useInsuranceForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IInsuranceForReport>, Error>({
        queryKey: [CACHE_KEY_INSURANCE_FOR_REPORT, filterReport, params],
        queryFn: () =>
            insuranceForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useInsuranceForReportQuery;
