import { CACHE_KEY_PLANT_PUNCH_FOR_REPORT } from "@/constants/cacheKeys";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import { useQuery } from "@tanstack/react-query";
import { plantPunchForReportService } from "../Services/reportService";
import IFilterReport from "../Types/IFilterReport";
import { IPlantPunchForReport } from "../Types/IPlantPunchForReport";

const usePlantPunchForReportQuery = (
    filterReport: IFilterReport,
    params: IParamsApi
) => {
    return useQuery<IResponse<IPlantPunchForReport>, Error>({
        queryKey: [CACHE_KEY_PLANT_PUNCH_FOR_REPORT, filterReport, params],
        queryFn: () =>
            plantPunchForReportService.getForReport(params, filterReport),
        initialData: { items: [] },
    });
};

export default usePlantPunchForReportQuery;
