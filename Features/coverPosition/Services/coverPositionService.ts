import ApiService from "@/services/ApiService";
import { ICoverPosition } from "../Types/ICoverPosition";

const coverPositionService = new ApiService<ICoverPosition, ICoverPosition>("employee/coverposition");
const coverPositionByIdEmployee = new ApiService<ICoverPosition, ICoverPosition>(`employee/coverposition/byIdEmployee/`);

export default coverPositionService;
export { coverPositionByIdEmployee };