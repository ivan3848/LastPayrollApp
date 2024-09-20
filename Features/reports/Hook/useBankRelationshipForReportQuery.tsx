import { CACHE_KEY_PAYROLL_PAY_EXPENSE_FOR_REPORT } from "@/constants/cacheKeys";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { payrollPayExpenseForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IPayrollPayExpenseForReport } from "../Types/IPayrollPayExpenseForReport";
import IParamsApi from "@/types/IParamApi";

const usePayrollPayExpenseForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IPayrollPayExpenseForReport>, Error>({
        queryKey: [
            CACHE_KEY_PAYROLL_PAY_EXPENSE_FOR_REPORT,
            filterReport,
            params,
        ],
        queryFn: () =>
            payrollPayExpenseForReportService.getForReport(
                params,
                filterReport
            ),
        initialData: { items: [] },
    });
};

export default usePayrollPayExpenseForReportQuery;
