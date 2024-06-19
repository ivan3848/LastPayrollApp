export interface IWorkScheduler {
    idWorkScheduler: number;
    name: string;
    workSchedulerCode?: string
    workSchedulerDetail: IWorkSchedulerDetail[];
    action?: React.ReactNode;
}

export interface IWorkSchedulerDetail {
    idWorkSchedulerDetail: number;
    idWorkScheduler: number;
    start: Date;
    end: Date;
    days: string;
    week: number;
    workScheduler: string;
}
