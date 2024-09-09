import { CACHE_KEY_USER_CONFIGURATION } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { userServiceWithLogin } from "../Service/userService";

import { IUser } from "../Types/IUser";

const useUserQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IUser>, Error>({
        queryKey: [CACHE_KEY_USER_CONFIGURATION, params, dependencies],
        queryFn: () => userServiceWithLogin.getForTable(params),
        initialData: { items: [] },
    });
};

export default useUserQuery;
