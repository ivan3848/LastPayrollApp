import ApiService from "@/services/ApiService";
import { INationality } from "../Types/INationality";

const nationalityService = new ApiService<INationality, INationality>("employee/nationality");
export default nationalityService;