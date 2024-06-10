import ApiService from "@/services/ApiService";
import { ISector } from "../Types/ISector";

const sectorService = new ApiService<ISector, ISector>("employee/sector");
export default sectorService;