export interface IEmployeeHistoryForReport {
    identifier: string;
    idEmployee: number;
    employeeName: string;
    employeeStatus: string;
    idDepartment: number;
    department: string;
    idPosition: number;
    position: string;
    salaryHistory: number;
    numberOfDependant: number;
    changeType: string;
    extraHour: string;
    payrollArea: string;
    startDateChange: string;
    endDateChange: string;
    idCompany: number;
}