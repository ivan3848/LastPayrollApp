import ApiService from "@/services/ApiService";

const workSchedulerSubstituteService = new ApiService<IWorkSchedulerSubstitute, IWorkSchedulerSubstitute>("employee/workSchedulerSubstitute/");

const addWorkSchedulerSubstitute = new ApiService<IWorkSchedulerSubstitute, IWorkSchedulerSubstitute>("employee/workSchedulerSubstitute/");

const workSchedulerSubstituteByIdEmployeeService = new ApiService<IWorkSchedulerSubstitute[], IWorkSchedulerSubstitute>(
    `employee/workSchedulerSubstitute/byIdEmployee/`
);

export default workSchedulerSubstituteService;
export { workSchedulerSubstituteByIdEmployeeService, addWorkSchedulerSubstitute };
    
