import IParamsApi from "@/types/IParamApi";
import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_COMMISSION_Detail } from "@/constants/cacheKeys";
import { ICommissionDetail } from "../../Commission/Types/ICommissionDetail";
import { commissionDetailByIdEmployeeService } from "../Services/commissionDetailService";

const useCommissionDetailByIdEmployee = (
    params: IParamsApi,
    dependencies: boolean[],
    idEmployee: number
) => {
    return useQuery<ICommissionDetail[], Error>({
        queryKey: [
            CACHE_KEY_COMMISSION_Detail,
            params,
            dependencies,
            idEmployee,
        ],
        queryFn: () =>
            commissionDetailByIdEmployeeService.getEntitiesById(idEmployee),
        initialData: [],
    });
};

export default useCommissionDetailByIdEmployee;
