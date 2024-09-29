import ApiService from "@/services/ApiService";

const firedEmployeeService = new ApiService<IFireEmployee, IFireEmployeeResponse>("employee/fireEmployee");

export default firedEmployeeService;
