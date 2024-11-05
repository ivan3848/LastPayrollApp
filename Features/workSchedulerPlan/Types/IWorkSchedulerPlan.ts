export interface IWorkSchedulerPlan {
    id: string;
    idEmployee: number;
    employeeName: string;
    date: Date;
    day: string;
    schedule: string;
    hourAmount: number;
    absenteeism: string;
    idWorkScheduler: number;
    idAbsenteeism?: number;
    isHoliday: boolean;
    start?: Date;
    end?: Date;
    conceptCode: string;
}