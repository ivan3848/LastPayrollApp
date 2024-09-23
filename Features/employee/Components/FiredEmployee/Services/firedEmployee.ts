import ApiService from "@/services/ApiService";

const firedEmployeeService = new ApiService<IFireEmployee, IFireEmployee>("employee/fireEmployee");

export default firedEmployeeService;
