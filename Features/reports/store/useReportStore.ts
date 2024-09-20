import { create } from "zustand";

type ReportStore = {
    selectedReport: string;
    setSelectedReport: (report: string) => void;
}

const useReportStore = create<ReportStore>((set) => ({
    selectedReport: "",
    setSelectedReport: (report: string) => set({ selectedReport: report ?? "" }),
}));

export default useReportStore;