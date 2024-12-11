import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_USER_WITH_IMAGE } from "@/constants/cacheKeys";
import { userServiceImage } from "@/Features/UserConfiguration/Service/userService";
import { IUser } from "@/Features/UserConfiguration/Types/IUser";

const useAuthQuery = (params: IParamsApi, dependencies: boolean[], id: string
) => {
    return useQuery<IUser, Error>({
        queryKey: [CACHE_KEY_USER_WITH_IMAGE, params, dependencies, id],
        queryFn: async () => userServiceImage.getById(id),
        initialData: {} as IUser,
    });
};

export default useAuthQuery;
