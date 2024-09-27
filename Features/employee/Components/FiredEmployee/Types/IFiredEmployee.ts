
interface IFireEmployee {
    idEmployee: number;
    firedDate: Date;
    comment: string;
    isTakenVacation: boolean;
    isUnemployment: boolean;
    isPreview: boolean;
    isNotice: boolean;
    isChristmasPayment: boolean;
    idStatusFired: number;
    idCancelationType: number;
}

interface IFireEmployeeResponse {
    idFiredEmployee: number;
    idEmployee: number;
    idStatusFired: number;
    firedDate: Date;
    comment: string;
    isNotice: boolean;
    isUnemployment: boolean;
    isTakenVacation: boolean;
    isChristmasPayment: boolean;
    taxes: number;
    subTotal: number;
    total: number;
    isActive: boolean;
    idCancelationType: number;
    unemploymentDay: number;
    noticeDay: number;
    royaltiesAndChristmasDay: number;
    vacationDays: string;
    avgSalary: number;
    missLease: number;
    timeWork: string;
    idFiredEmployeeResume: number;
    totalProfit: number;
}