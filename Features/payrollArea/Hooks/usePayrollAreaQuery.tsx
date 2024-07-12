import IParamsApi from "@/types/IParamApi";
import { IPayrollArea } from "../Types/IPayrollArea";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import payrollAreaService from "../Services/payrollAreaService";
import { CACHE_KEY_PAYROLL_AREA } from "@/constants/cacheKeys";


const usePayrollAreaQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IPayrollArea>, Error>({
        queryKey: [CACHE_KEY_PAYROLL_AREA, params, dependencies],
        queryFn: () => payrollAreaService.getForTable(params),
        initialData: { items: [] },
    });
};

export default usePayrollAreaQuery;
