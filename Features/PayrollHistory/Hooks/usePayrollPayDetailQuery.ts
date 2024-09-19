import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import ApiService from "@/services/ApiService";
import IResponse from "@/types/IResponse";
import { IPayrollPay } from "@/Features/payrollPay/types/IPayrollPay";

const usePayrollPayDetailQuery =(
    params: IParamsApi,
    dependencies: boolean[],
    cacheKey: string,
    service: ApiService<IPayrollPay, IPayrollPayResume>,
    id: number
) => {
    return useQuery<IResponse<IPayrollPayResume>, Error>({
        queryKey: [cacheKey, params, dependencies],
        queryFn: async () => {
            const items = await service.getEntitiesById(id);
            return { items };
        },
        initialData: { items: [] },
    });
};

export default usePayrollPayDetailQuery;
