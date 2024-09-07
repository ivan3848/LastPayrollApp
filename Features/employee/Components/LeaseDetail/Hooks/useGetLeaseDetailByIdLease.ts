import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_LEASE_DETAIL } from "@/constants/cacheKeys";
import { leaseDetailByIdLeaseService } from "../Services/LeaseDetailService";
import { ILeaseDetail } from "../Types/ILeaseDetail";

const useGetLeaseDetailByIdLease = (
    params: IParamsApi,
    dependencies: boolean[],
    idLease: number
) => {
    return useQuery<ILeaseDetail[], Error>({
        queryKey: [CACHE_KEY_LEASE_DETAIL, params, dependencies, idLease],
        queryFn: () => leaseDetailByIdLeaseService.getEntitiesById(idLease),
        initialData: [],
    });
};

export default useGetLeaseDetailByIdLease;