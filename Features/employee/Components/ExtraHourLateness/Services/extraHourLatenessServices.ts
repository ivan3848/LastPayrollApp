import ApiService from "@/services/ApiService";

const extraHourLatenessService = new ApiService<IExtraHourLateness, IExtraHourLateness>(
    "employee/extraHourLateness"
);

const addExtraHourLatenessService = new ApiService<IExtraHourLateness, IExtraHourLateness>(
    "employee/extraHourLateness"
);

const extraHourLatenessByIdEmployeeService = new ApiService<IExtraHourLateness[], IExtraHourLateness>(
    `employee/extraHourLateness/`
);

export default extraHourLatenessService;
export { addExtraHourLatenessService, extraHourLatenessByIdEmployeeService };
