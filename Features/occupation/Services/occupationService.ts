import ApiService from "@/services/ApiService";
import { IOccupation } from "../Types/IOccupation";

const occupationService = new ApiService<IOccupation, IOccupation>("employee/occupation");
export default occupationService;