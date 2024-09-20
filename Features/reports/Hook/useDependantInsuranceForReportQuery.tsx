import { CACHE_KEY_DEPENDANT_INSURANCE_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { dependantInsuranceForReportService } from "../Services/reportService";
import { IDependantInsuranceForReport } from "../Types/IDependantInsuranceForReport";
import IFilterReport from "../Types/IFilterReport";

const useDependantInsuranceForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IDependantInsuranceForReport>, Error>({
        queryKey: [
            CACHE_KEY_DEPENDANT_INSURANCE_FOR_REPORT,
            filterReport,
            params,
        ],
        queryFn: () =>
            dependantInsuranceForReportService.getForReport(
                params,
                filterReport
            ),
        initialData: { items: [] },
    });
};

export default useDependantInsuranceForReportQuery;
