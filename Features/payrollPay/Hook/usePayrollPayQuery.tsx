import IParamsApi from "@/types/IParamApi";
import { IPayrollPay } from "../types/IPayrollPay";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PAYROLL_PAY } from "@/constants/cacheKeys";
import payrollPayService from "../Services/payrollPayService";

const usePayrollPayQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IPayrollPay>, Error>({
        queryKey: [CACHE_KEY_PAYROLL_PAY, params, dependencies],
        queryFn: () => payrollPayService.getForTable(params),
        initialData: { items: [] },
    });
};

export default usePayrollPayQuery;
