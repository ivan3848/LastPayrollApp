import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import IResponse from "@/types/IResponse";
import { CACHE_KEY_DEPENDANT } from "@/constants/cacheKeys";
import { IDependant } from "../Types/IDependant";
import dependantService from "../Services/dependantService";

const useDependant = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IDependant>, Error>({
        queryKey: [CACHE_KEY_DEPENDANT, params, dependencies],
        queryFn: () => dependantService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useDependant;
