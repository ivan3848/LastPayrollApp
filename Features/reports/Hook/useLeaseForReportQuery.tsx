import { CACHE_KEY_LEASE_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { leaseForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { ILeaseForReport } from "../Types/ILeaseForReport";

const useLeaseForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<ILeaseForReport>, Error>({
        queryKey: [CACHE_KEY_LEASE_FOR_REPORT, filterReport, params],
        queryFn: () => leaseForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useLeaseForReportQuery;
