import { CACHE_KEY_ORGANIZATIONAL_UNIT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { IOrganizationalUnit } from "../Types/IOrganizationalUnit";
import organizationalUnitService from "../Services/organizationalUnitService";

const useOrganizationalUnitQuery = (
    params: IParamsApi,
    dependencies: boolean[]
) => {
    return useQuery<IResponse<IOrganizationalUnit>, Error>({
        queryKey: [CACHE_KEY_ORGANIZATIONAL_UNIT, params, dependencies],
        queryFn: () => organizationalUnitService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useOrganizationalUnitQuery;
