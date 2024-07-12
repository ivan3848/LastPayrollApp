import { CACHE_KEY_HIERARCHY_POSITION } from "@/constants/cacheKeys";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import hierarchyPositionService from "../Services/hierarchyPositionService";
import { IHierarchyPosition } from "../Types/IHierarchyPosition";
import { useParamAllData } from "@/Features/Shared/Hooks/useParamFilter";

const useGetFreeHierarchyPosition = (
    idPosition: number,
    dependencies: boolean[]
) => {
    const { params, setParams } = useParamAllData();
    setParams((currentParams) => {
        return {
            ...currentParams,
            filter: {
                ...currentParams.filter,
                filters: [
                    {
                        column: "idPosition",
                        value: idPosition,
                    },
                    {
                        column: "isOccupied",
                        value: false,
                    },
                ],
            },
        };
    });

    return useQuery<IResponse<IHierarchyPosition>, Error>({
        queryKey: [CACHE_KEY_HIERARCHY_POSITION, params, dependencies],
        queryFn: () => hierarchyPositionService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useGetFreeHierarchyPosition;
