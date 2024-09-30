import ApiService from "@/services/ApiService";

const extraHourLatenessDataService = new ApiService<IExtraHourLatenessData, IExtraHourLatenessData>(
    "employee/extraHourLatenessData"
);

export default extraHourLatenessDataService;