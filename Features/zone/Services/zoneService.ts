import ApiService from "@/services/ApiService";
import { IZone } from "../Types/IZone";

const zoneService = new ApiService<IZone, IZone>("employee/zone");
export default zoneService;