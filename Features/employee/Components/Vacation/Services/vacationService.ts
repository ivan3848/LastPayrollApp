import ApiService from "@/services/ApiService";

const vacationService = new ApiService<IVacation, IVacation>("employee/vacation");

const addVacationService = new ApiService<IVacation, IVacation>("employee/vacation");

const vacationByIdEmployeeService = new ApiService<IVacation[], IVacation>(
    `employee/vacation/byIdEmployee/`
);

const calculateVacationDayService = new ApiService<ICalculateVacationDays, ICalculateVacationDaysResult>(
    `employee/vacation/calculateVacationDays/`
);

export default vacationService;
export { vacationByIdEmployeeService, addVacationService, calculateVacationDayService };