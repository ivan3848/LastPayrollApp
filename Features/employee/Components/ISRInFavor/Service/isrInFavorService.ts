import ApiService from "@/services/ApiService";
import { IISRInFavor } from "../Types/ISRInFavor";

const isrInFavorService = new ApiService<IISRInFavor, IISRInFavor>(
    "employee/isrInFavor"
);
export default isrInFavorService;
