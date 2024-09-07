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