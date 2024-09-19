export default interface IFilterReport {
    idPayrollPay?: number;
    conceptCode?: string[];
    idCostCenter?: number[];
    idsEmployee?: number[];
    start?: Date;
    end?: Date;
    idAccountingAccount?: number,
    idDepartment?: number,
    position?: string[],
    idPayrollPayCompare?: number,
    idIncentive?: number
}