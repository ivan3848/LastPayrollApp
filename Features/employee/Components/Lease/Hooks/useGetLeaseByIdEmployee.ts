import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_LEASE } from "@/constants/cacheKeys";
import { leaseByIdEmployeeService } from "../Services/LeaseService";

const useGetLeaseByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<ILease[], Error>({
        queryKey: [CACHE_KEY_LEASE, params, dependencies, idEmployee],
        queryFn: () => leaseByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useGetLeaseByIdEmployee;