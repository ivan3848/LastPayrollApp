export interface IEmployee {
    idEmployee?: number;
    idHierarchyPosition?: number;
    idHierarchyPositionManager?: number | null;
    functionDescription?: string | null;
    idPayrollArea?: number;
    salary?: number;
    idWorkScheduler?: number;
    email?: string | null;
    startDate?: Date;
    endWorkDate?: Date;
    haveKid?: boolean | null;
    numberOfKid?: number | null;
    idStatusActionClass?: number;
    idGroupManager?: number | null;
    isGroupManager?: boolean | null;
    workRelation?: string | null;
    sindicate?: boolean;
    extraHours?: boolean;
    temporal?: boolean;
    idContractType?: number | null;
    zipCode?: string | null;
    contactName?: string;
    idStatusRelationship?: number;
    employeeImage?: string | null;
    groupManagerAuthorize?: string;
    idDisability?: number | null;
    dateChange?: Date | null;
    description?: string | null;
    employeeName?: string | null;
    workSchedulerName?: string | null;
}
