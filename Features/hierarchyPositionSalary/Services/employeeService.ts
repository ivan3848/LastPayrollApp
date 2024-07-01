import ApiService from "@/services/ApiService";

const employeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee"
);
export default employeeService;