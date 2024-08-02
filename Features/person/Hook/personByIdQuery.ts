import { CACHE_KEY_PERSON } from '@/constants/cacheKeys';
import IParamsApi from '@/types/IParamApi';
import { useQuery } from '@tanstack/react-query';
import { IPerson } from '../Types/IPerson';
import { personByIdService } from '../Services/personService';

const personByIdQuery  = (
    params: IParamsApi,
    dependencies: boolean[],
    idPerson: number
) => {
    return useQuery<IPerson[], Error>({
        queryKey: [CACHE_KEY_PERSON, params, dependencies, idPerson],
        queryFn: () => personByIdService.getById(idPerson),
        initialData: [],
    });
}

export default personByIdQuery