import IParamsApi from "@/types/IParamApi";
import { IEducation } from "../Types/IEducation";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import educationService from "../Services/educationService";
import { CACHE_KEY_EDUCATION } from "@/constants/cacheKeys";

const useEducationQuery = (params: IParamsApi, dependencies: boolean[]) => {
    return useQuery<IResponse<IEducation>, Error>({
        queryKey: [CACHE_KEY_EDUCATION, params, dependencies],
        queryFn: () => educationService.getForTable(params),
        initialData: { items: [] },
    });
};

export default useEducationQuery;
