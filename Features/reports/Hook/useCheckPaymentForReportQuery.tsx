import { CACHE_KEY_CHECK_PAYMENT_FOR_REPORT } from "@/constants/cacheKeys";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { checkPaymentForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import IParamsApi from "@/types/IParamApi";
import { ICheckPaymentForReport } from "../Types/ICheckPaymentForReport";

const useCheckPaymentForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<ICheckPaymentForReport>, Error>({
        queryKey: [CACHE_KEY_CHECK_PAYMENT_FOR_REPORT, filterReport, params],
        queryFn: () =>
            checkPaymentForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default useCheckPaymentForReportQuery;
