import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_COVER_LICENSES } from "@/constants/cacheKeys";
import { licenseByIdEmployeeService } from "../Services/licenseService";

const useGetLicenseByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<ILicenses[], Error>({
        queryKey: [CACHE_KEY_COVER_LICENSES, params, dependencies, idEmployee],
        queryFn: () => licenseByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useGetLicenseByIdEmployee;