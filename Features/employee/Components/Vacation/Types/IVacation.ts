interface IVacation {
    idVacation?: number;
    idEmployee: number;
    start: Date;
    end: Date;
    paid?: boolean;
    totalRemain?: number;
    enjoymentDay?: number;
    reEntryDate?: Date;
    payrollPayDate?: Date;
    absenteeism?: number;
    dayPay?: number;
}

interface IVacationInsert {
    idVacation?: number;
    idEmployee: number;
    start: Date;
    end: Date;
    paid?: boolean;
    totalRemain?: number;
    enjoymentDay?: number;
    reEntryDate?: Date;
    payrollPayDate?: Date;
    absenteeism?: number;
    dayPay?: number;
}

interface ICalculateVacationDays {
    idVacation?: number;
    idEmployee: number;
    from: Date;
    to: Date;
}

interface ICalculateVacationDaysResult {
        enjoymentDays: number
        absenteeismDays: number,
        excepcion: string,
        absenteeism: string
}