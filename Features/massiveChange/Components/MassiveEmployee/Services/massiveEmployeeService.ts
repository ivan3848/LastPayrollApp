import ApiService from "@/services/ApiService";
import { IMassiveEmployee } from "../Types/IMassiveEmployee";

const massiveEmployeeService = new ApiService<IMassiveEmployee, IMassiveEmployee>("employee/employee/massiveEmployee");
export default massiveEmployeeService;

