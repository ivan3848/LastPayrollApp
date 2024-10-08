interface IExtraHourLateness {
    idExtraHourLateness?: number;
    idConcept: number;
    idEmployee: number;
    hourAmount: number;
    date: Date;
    typeValue: string;
    idCostCenter: number;
    description: string;
    isToPay?: boolean;
}

interface IExtraHourLatenessData {
    idExtraHourLatenessData?: number;
    description: string;
    dateExecute: Date;
    isPaid: boolean;
    idCompany: number;
}

interface IExtraHourLatenessUpdate {
    idExtraHourLateness: number;
    idConcept: number;
    idEmployee: number;
    hourAmount: number;
    date: Date;
    hourIn: Date;
    hourOut: Date;
    typeValue: string;
    isPaid: boolean;
    isToPay: boolean;
    idCostCenter: number;
    description: string;
    idExtraHourLatenessData: number;
}
