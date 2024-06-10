import { CACHE_KEY_PROVINCE } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import { IProvince } from "../Types/IProvince";
import IResponse from "@/types/IResponse";
import provinceService from "../Services/provinceService";
import { useQuery } from "@tanstack/react-query";

const useProvinceQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IProvince>, Error>({
        queryKey: [CACHE_KEY_PROVINCE, params, dependencies],
        queryFn: () => provinceService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useProvinceQuery;
