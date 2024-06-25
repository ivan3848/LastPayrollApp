import { IWorkSchedulerDetail } from "@/Features/workSchedulerDetail/Types/IWorkSchedulerDetail";

export interface IWorkScheduler {
    idWorkScheduler: number;
    name: string;
    workSchedulerCode?: string;
    workSchedulerDetail: IWorkSchedulerDetail[];
    action?: React.ReactNode;
}
