import { CACHE_KEY_BANK_PAYMENT_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { bankPaymentForReportService } from "../Services/reportService";
import { IBankPaymentForReport } from "../Types/IBankPaymentForReport";
import IFilterReport from "../Types/IFilterReport";

const usePayrollPayExpenseForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IBankPaymentForReport>, Error>({
        queryKey: [CACHE_KEY_BANK_PAYMENT_FOR_REPORT, filterReport, params],
        queryFn: () =>
            bankPaymentForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default usePayrollPayExpenseForReportQuery;
