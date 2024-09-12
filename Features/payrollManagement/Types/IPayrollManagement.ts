interface IPayrollManagement {
    idPayrollManagement: number;
    idPayrollArea: number;
    modifiedByEmployeeId?: number;
    lastModifiedDate: Date;
    payrollPeriodStart: Date;
    payrollPeriodEnd: Date;
    date: Date;
    retroactivePeriodLimit: Date;
    idStatus: number;
    payrollNumber: number;
    process: number;
    employee?: string;
}

interface IPayrollManagementInsert {
    idPayrollArea: number;
    modifiedByEmployeeId?: number;
    lastModifiedDate: Date;
    payrollPeriodStart: Date;
    payrollPeriodEnd: Date;
    date: Date;
    idStatus: number;
    payrollNumber: number;
    process: number;
}

interface IPayrollManagementUpdate {
    idPayrollManagement: number;
    idPayrollArea: number;
    modifiedByEmployeeId?: number;
    lastModifiedDate: Date;
    payrollPeriodStart: Date;
    payrollPeriodEnd: Date;
    date: Date;
    idStatus: number;
    payrollNumber: number;
    process: number;
}

interface IPayrollManagementByPayrollArea {
    idPayrollArea: number;
    date: Date;
}

interface IPayrollManagementByPayrollNumber {
    payrollNumber: number;
    idPayrollArea: number;
    PayrollYear: Date;
}