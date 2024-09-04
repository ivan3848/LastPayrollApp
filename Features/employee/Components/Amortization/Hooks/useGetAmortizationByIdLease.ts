import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_AMORTIZATION } from "@/constants/cacheKeys";
import { amortizationByIdLeaseService } from "../Services/AmortizationService";

const useGetAmortizationByIdLease = (
    params: IParamsApi,
    dependencies: boolean[],
    idLease: number
) => {
    return useQuery<IAmortization[], Error>({
        queryKey: [CACHE_KEY_AMORTIZATION, params, dependencies, idLease],
        queryFn: () => amortizationByIdLeaseService.getEntitiesById(idLease),
        initialData: [],
    });
};

export default useGetAmortizationByIdLease;