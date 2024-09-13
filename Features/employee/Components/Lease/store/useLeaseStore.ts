import { create } from "zustand";

type LeaseStore = {
    isFromLeasePause: boolean;
    showForm: boolean;
    setIsFromLeasePause: (isFromLeasePause: boolean) => void;
    setShowForm: (showForm: boolean) => void;
}

const useLeaseStore = create<LeaseStore>((set) => ({
    isFromLeasePause: false,
    showForm: true,
    setIsFromLeasePause: (isFromLeasePause) => set({ isFromLeasePause: !isFromLeasePause }),
    setShowForm: (showForm) => set({ showForm: !showForm })
}));

export default useLeaseStore;