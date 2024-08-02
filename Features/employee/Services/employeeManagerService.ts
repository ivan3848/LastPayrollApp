import ApiService from "@/services/ApiService";
import { IEmployee } from "../Types/IEmployee";

const employeeManagerService = new ApiService<IEmployee, IEmployee>(
    "employee/employee"
);


export default employeeManagerService;
