import ApiService from "@/services/ApiService";
import { IISRInFavor } from "../Types/ISRInFavor";

const ISRInFavorService = new ApiService<IISRInFavor, IISRInFavor>(
    "employee/isrinfavor"
);

const addISRInFavorService = new ApiService<IISRInFavor, IISRInFavor>(
    "employee/isrinfavor"
);

const ISRInFavorByIdEmployeeService = new ApiService<
    IISRInFavor[],
    IISRInFavor
>(`employee/isrinfavor/byIdEmployee/`);

export default ISRInFavorService;
export { ISRInFavorByIdEmployeeService, addISRInFavorService };
