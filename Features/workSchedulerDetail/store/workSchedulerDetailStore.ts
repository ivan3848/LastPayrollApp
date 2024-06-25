import create from "zustand";
import { IWorkSchedulerDetail } from "../Types/IWorkSchedulerDetail";

interface WorkSchedulerDetailStore {
    data: IWorkSchedulerDetail[];
    setData: (data: IWorkSchedulerDetail) => void;
    addWorkSchedulerDetail: (data: IWorkSchedulerDetail) => void;
    removeWorkSchedulerDetail: (id: number) => void;
    clearData: () => void;
}

export const useWorkSchedulerDetailStore = create<WorkSchedulerDetailStore>(
    (set) => ({
        data: [] as IWorkSchedulerDetail[],
        addWorkSchedulerDetail: (data) =>
            set((state) => ({ data: [...state.data, data] })),
        setData: (data) => set((state) => ({ data: [data] })),
        removeWorkSchedulerDetail(id) {
            set((state) => ({
                data: state.data.filter(
                    (workSchedulerDetail) =>
                        workSchedulerDetail.idWorkSchedulerDetail !== id
                ),
            }));
        },
        clearData: () => set({ data: [] }),
    })
);
