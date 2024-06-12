export interface ICostCenter {
    idCostCenter: number;
    description: string;
    accountNumber?: string;
    start?: Date;
    end?: Date;
    action?: React.ReactNode;
}
