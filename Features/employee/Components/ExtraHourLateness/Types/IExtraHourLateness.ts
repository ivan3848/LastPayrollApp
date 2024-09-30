interface IExtraHourLateness {
    idExtraHourLateness?: number;
    idConcept: number;
    idEmployee: number;
    hourAmount: number;
    date: Date;
    typeValue: string;
    idCostCenter: number;
    description: string;
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