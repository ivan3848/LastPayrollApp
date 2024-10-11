import { CACHE_KEY_PAYROLL_CONFIGURATION } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { IPayrollConfiguration } from "../Types/IPayrollConfiguration";
import PayrollConfigurationService from "../Services/payrollConfigurationService";

const usePayrollConfigurationQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IPayrollConfiguration>, Error>({
        queryKey: [CACHE_KEY_PAYROLL_CONFIGURATION, params, dependencies],
        queryFn: () => PayrollConfigurationService.getForTable(params),
        initialData: { items: [] },
    });
};

export default usePayrollConfigurationQuery;
