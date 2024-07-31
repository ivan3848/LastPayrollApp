import { CACHE_KEY_PERSONINSURANCE } from '@/constants/cacheKeys';
import IParamsApi from '@/types/IParamApi';
import { useQuery } from '@tanstack/react-query';
import { personInsuranceByIdEmployee } from '../Services/personInsuranceService';

const useGetPersonInsuranceQueryByIdEmployee = (
        params: IParamsApi,
        dependencies: boolean[],
        idEmployee: number
    ) => {
        return useQuery<IPersonInsurance[], Error>({
            queryKey: [CACHE_KEY_PERSONINSURANCE, params, dependencies, idEmployee],
            queryFn: () => personInsuranceByIdEmployee.getById(idEmployee),
            initialData: [],
        });
};

export default useGetPersonInsuranceQueryByIdEmployee