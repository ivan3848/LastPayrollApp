import { create } from "zustand";

type AmortizationStore = {
    isForAddAmortization: boolean;
    setIsForAddAmortization: (isForAddAmortization: boolean) => void;
}

const useAmortizationStore = create<AmortizationStore>((set) => ({
    isForAddAmortization: true,
    setIsForAddAmortization: (isForAddAmortization) => set({ isForAddAmortization: !isForAddAmortization }),
}));

export default useAmortizationStore