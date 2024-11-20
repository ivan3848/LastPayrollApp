export interface IComplementaryData {
    idComplementaryData: number;
    description: string;
    dateExecuted: string;
    complementaryData: complementaryData[];
    isPaid: boolean;
    idPayrollPay?: number;
    idCompany: number;
}

interface complementaryData {
    idEmployee?: number;
    amount: number;
    start: Date;
    conceptCode: string;
}

const complementaryDataSchema: Object = {
    idEmployee: 0,
    conceptCode: "",
    dateExecuted: "",
    amount: 0,
};

export { complementaryDataSchema };
