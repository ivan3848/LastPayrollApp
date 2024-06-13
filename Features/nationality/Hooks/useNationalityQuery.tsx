import IParamsApi from "@/types/IParamApi";
import { INationality } from "../Types/INationality";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import nationalityService from "../Services/nationalityService";
import { CACHE_KEY_NATIONALITY } from "@/constants/cacheKeys";

const useNationalityQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<INationality>, Error>({
        queryKey: [CACHE_KEY_NATIONALITY, params, dependencies],
        queryFn: () => nationalityService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useNationalityQuery;
