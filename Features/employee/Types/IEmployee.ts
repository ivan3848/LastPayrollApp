import { IPerson } from "@/Features/person/Types/IPerson";

export interface IEmployee {
    idEmployee: number;
    idPerson?: number;
    startDate: Date;
    salary: number;
    email?: string;
    idEmployeeManager: number;
    workRelation?: boolean;
    haveKids?: boolean;
    numberOfKid?: number;
    functionDescription?: string;
    idGroupManager?: number;
    idContractType?: number;
    zipCode?: string;
    contactNumber?: string;
    employeeImage?: string;
    isPaid?: boolean;
    isOpen?: boolean;
    lockBy?: number;
    idDisability?: number;
    employeeCustomerId?: string;
    isDependantExist?: boolean;
    idCompany?: number;
    idDepartment?: number;
    department?: string;
    idPosition?: number;
    position?: string;
    isActive: boolean;
    idHierarchyPosition?: number;
    employeeManagerName?: string;
    idPayrollArea?: number;
    idWorkScheduler?: number;
    endWorkDate?: Date;
    haveKid?: boolean;
    idStatusActionClass?: number;
    isGroupManager?: boolean;
    sindicate?: boolean;
    extraHours?: boolean;
    temporal?: boolean;
    contactName?: string;
    idStatusRelationship?: number;
    groupManagerAuthorize?: string;
    dateChange?: Date;
    description?: string;
    employeeName?: string;
    workSchedulerName?: string;
    identification?: string;
    employeeImageName?: string;
    employeeImageType?: string;
    person?: IPerson;
}