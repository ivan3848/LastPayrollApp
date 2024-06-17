export interface IConcept {
    idConcept: number;
    idConceptType: number;
    name: string;
    idAccountingAccount: number;
    percentValue: number;
    amount: number;
    conceptCode: string;
    isSpecial: boolean;
    isAbsenteeism: boolean;
    isExtraHour: boolean;
    isInsurance: boolean;
    isProfit: boolean;
    isLease: boolean;
    isTax: boolean;
    beforeIsr: boolean;
    toProjectTax: boolean;
    toProjectIsr: boolean;
    isCompany: boolean;
    isForChargeTax: boolean;
    isForChargeTaxIsr: boolean;
    isOnlySecondPayroll: boolean;
    isOtherProfit: boolean;
    isBonification: boolean;
    isDeduction: boolean;
    isCommission: boolean;
}
