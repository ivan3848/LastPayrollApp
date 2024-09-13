interface IAmortization {
    idAmortization: number;
    idLease?: number;
    idStatus?: number;
    idConcept?: number;
    isPaid?: boolean;
    isToPay?: boolean;
    amount?: number;
    payDate?: Date;
}