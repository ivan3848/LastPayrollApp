import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_DEPENDANT } from "@/constants/cacheKeys";
import { personInsuranceById } from "../Services/personInsuranceService";

const usePersonInsuranceById = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<IPersonInsurance[], Error>({
        queryKey: [CACHE_KEY_DEPENDANT, params, dependencies, idEmployee],
        queryFn: () => personInsuranceById.getById(idEmployee),
        initialData: [],
    });
};

export default usePersonInsuranceById;
