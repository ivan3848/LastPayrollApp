import ApiService from "@/services/ApiService";
import { IDepartment } from "../Types/IDepartment";

const departmentService = new ApiService<IDepartment, IDepartment>(
    "employee/department"
);
export default departmentService;
