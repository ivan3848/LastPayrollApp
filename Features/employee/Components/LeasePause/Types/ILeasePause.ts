interface ILeasePause {
    idLeasePause: number;
    idLease: number;
    idEmployeeModify: number;
    startPauseDate?: Date;
    endPauseDate?: Date;
    isPauseActive?: boolean;
    description?: string;
}