import ApiService from "@/services/ApiService";
import { IEmployee } from "../Types/IEmployee";
import { IEmployeeChange } from "../Types/IEmployeeChange";
import { IEmployeeHistory } from "../Types/IEmployeeHistory";
import { IBankEmployeeHistory } from "../Components/BankEmployeeHistory/types/IBankEmployeeHistory";

const employeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee"
);
const employeeChangeService = new ApiService<IEmployeeChange, IEmployee>(
    "employee/employee/employeeChange"
);

const employeeHistory = new ApiService<IEmployee, IEmployeeHistory>(
    "employee/employeeHistory"
);

const bankEmployeeHistory = new ApiService<IBankEmployeeHistory, IBankEmployeeHistory>(
    "employee/bankEmployeeHistory"
);

const bankEmployeeHistoryByIdEmployee = new ApiService<IBankEmployeeHistory, IBankEmployeeHistory>(
    `employee/bankEmployeeHistory/byIdEmployee/`
);

export default employeeService;
export { employeeChangeService, employeeHistory, bankEmployeeHistory, bankEmployeeHistoryByIdEmployee };
