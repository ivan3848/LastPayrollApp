import ApiService from "@/services/ApiService";
import { IEmployee } from "../Types/IEmployee";
import { IEmployeeChange } from "../Types/IEmployeeChange";
import { IEmployeeHistory } from "../Types/IEmployeeHistory";
const employeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee"
);

const employeeChangeService = new ApiService<IEmployeeChange, IEmployee>(
    "employee/employee/employeeChange"
);

const employeeHistory = new ApiService<IEmployee, IEmployeeHistory>(
    "employee/employeeHistory"
);



export default employeeService;
export { employeeChangeService, employeeHistory };
