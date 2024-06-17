import ApiService from "@/services/ApiService";
import { IEmployee } from "../Types/IEmployee";

const locationService = new ApiService<IEmployee, IEmployee>(
    "employee/employee"
);
export default locationService;
