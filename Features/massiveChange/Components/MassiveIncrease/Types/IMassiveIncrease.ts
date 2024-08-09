export interface IMassiveIncrease {
    IdMassiveIncrease?: number;
    name: string;
    chargeDate: string;
    employees: Employee[]
    isPaid: boolean;
    idPayrollPay?: number;
}
export interface Employee {
    idEmployee: number;
    salary: number;
    dateChange: string
    reason: string;
}

const massiveIncreaseSchema: Object = {
    idEmployee: 0,
    salary: 0,
    dateChange: "",
    reason: ""
};

export { massiveIncreaseSchema };