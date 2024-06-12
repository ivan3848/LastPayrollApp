import ApiService from "@/services/ApiService";
import { IPosition } from "../Types/IPosition";

const positionService = new ApiService<IPosition, IPosition>("employee/position");
export default positionService;