export interface IMassiveIncrease {
    IdMassiveIncrease: number;
    name: string;
    chargeDate: string;
    employee: {
        idEmployee: number,
        salary: number,
        dateChange: string,
        reason: string
    }
    isPaid: boolean;
    idPayrollPay?: number;
}
const massiveIncreaseSchema: Object = {
    idEmployee: 0,
    salary: 0,
    dateChange: "",
    reason: ""
};

export { massiveIncreaseSchema };