import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import IUser from "../types/IUser";
import { CACHE_KEY_USER_WITH_IMAGE } from "@/constants/cacheKeys";
import { userServiceImage } from "@/Features/UserConfiguration/Service/userService";

const useAuthQuery = (params: IParamsApi, dependencies: boolean[], id: number
) => {
    return useQuery<IUser[], Error>({
        queryKey: [CACHE_KEY_USER_WITH_IMAGE, params, dependencies, id],
        // queryFn: async () => userServiceImage.getEntitiesById(id),
        initialData: [],
    });
};

export default useAuthQuery;
