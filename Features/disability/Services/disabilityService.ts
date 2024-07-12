import ApiService from "@/services/ApiService";
import { IDisability } from "../Types/IDisability";

const disabilityService = new ApiService<IDisability, IDisability>("employee/disability");
export default disabilityService;