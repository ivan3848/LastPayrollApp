export default interface IDGT4View {
    idEmployee?: number;
    identification?: string;
    firstName?: string;
    middleName?: string;
    firstLastName?: string;
    secondLastName?: string;
    sex?: string;
    birthDate?: Date;
    salary?: number;
    startDate?: Date;
    idPosition?: number;
    position?: string;
    idWorkScheduler?: number;
    idZone?: number;
    description?: string;
    date?: Date;
    workSchedulerCode?: string;
    vacation?: { start: Date, end: Date };
    occupation?: string;
    nationality?: string;
    education?: string;
    disability?: string;
}