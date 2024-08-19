interface IWorkSchedulerSubstitute {
    idWorkSchedulerSubstitute?: number;
    idEmployee: number;
    idEmployeeAuthorize?: number;
    idWorkScheduler: number;
    startDate: Date;
    endDate: Date;
    description: string;
}

interface IWorkSchedulerSubstituteInsert {
    idEmployee: number;
    idEmployeeAuthorize?: number;
    idWorkScheduler: number;
    startDate: Date;
    endDate: Date;
    description: string;
}