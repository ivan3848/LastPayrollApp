import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_LAST_PAYROLL_MANAGEMENT } from "@/constants/cacheKeys";
import { lastPayrollManagementService } from "../payrollManagementService";

const useGetPayrollManagementByIdPayrollArea = (
    params: IParamsApi,
    dependencies: boolean[],
    idPayrollArea: number
) => {
    return useQuery<IPayrollManagement[], Error>({
        queryKey: [CACHE_KEY_LAST_PAYROLL_MANAGEMENT, params, dependencies, idPayrollArea],
        queryFn: () => lastPayrollManagementService.getEntitiesById(idPayrollArea),
        initialData: [],
    });
};

export default useGetPayrollManagementByIdPayrollArea;