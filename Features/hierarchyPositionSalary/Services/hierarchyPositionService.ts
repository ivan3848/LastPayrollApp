import ApiService from "@/services/ApiService";

const hierarchyPositionService = new ApiService<IPositionSalary, IPositionSalary>(
    "employee/employeechange"
);
export default hierarchyPositionService;