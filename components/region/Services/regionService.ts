import ApiService from "@/services/ApiService";
import { IRegion } from "../Types/IRegion";

const regionService = new ApiService<IRegion, IRegion>("employee/region");
export default regionService;