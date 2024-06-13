import ApiService from "@/services/ApiService";
import { IEducation } from "../Types/IEducation";

const educationService = new ApiService<IEducation, IEducation>("employee/education");
export default educationService;