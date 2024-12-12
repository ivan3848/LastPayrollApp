import { create } from "zustand";

type AuthStore = {
    employeeImage: string;
    setEmployeeImage: (image: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    employeeImage: "",
    setEmployeeImage: (image: string) => set({ employeeImage: image }),
}));

export default useAuthStore;