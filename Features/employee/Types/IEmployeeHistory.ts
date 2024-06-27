export interface IEmployeeHistory {
    idEmployeeHistory: number;
    idEmployee: number;
    idHierarchyPosition: number;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    salary: number;
    idNewsStatus?: number;
    idMassiveIncrease?: number;
    idWorkScheduler?: number;
    idGroupManager?: number;
    idHierarchyPositionManager?: number;
    idContractType?: number;
    idPayrollArea?: number;
    extraHours?: boolean;
    sindicate?: boolean;
    temporal?: boolean;
    groupManagerAuthorize?: string;
    endWorkDate?: Date;
}
