import ApiService from "@/services/ApiService";
import { IEmployee } from "../Types/IEmployee";
import { IEmployeeChange } from "../Types/IEmployeeChange";
import { IEmployeeHistory } from "../Types/IEmployeeHistory";
import { IInsertEmployee } from "../Types/IInsertEmployee";

const employeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee"
);

const addEmployeeService = new ApiService<IInsertEmployee, IInsertEmployee>(
    "employee/employee"
);

const employeeChangeService = new ApiService<IEmployeeChange, IEmployee>(
    "employee/employee/employeeChange"
);

const employeeHistory = new ApiService<IEmployee, IEmployeeHistory>(
    "employee/employeeHistory"
);

const deleteEmployeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee/byidemployee"
);

export default employeeService;
export { employeeChangeService, employeeHistory, addEmployeeService, deleteEmployeeService };
