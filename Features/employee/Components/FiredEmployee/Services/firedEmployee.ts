import ApiService from "@/services/ApiService";
import { IFireEmployee, IFireEmployeeResponse } from "../Types/IFiredEmployee";

const firedEmployeeService = new ApiService<IFireEmployee, IFireEmployeeResponse>("employee/fireEmployee");

export default firedEmployeeService;
