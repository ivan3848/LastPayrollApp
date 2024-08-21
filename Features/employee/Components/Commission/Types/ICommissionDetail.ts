export interface ICommissionDetail {
    amount: number;
    date: Date;
    concept: number;
    isPaid: boolean;
    idCommissionDetail?: number;
    idCommission: number;
    description?: string;
}
