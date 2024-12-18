// filepath: /c:/SpecialistNom/LastPayrollApp/context/LoadingContext.tsx
import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext({
    isLoading: false,
    setLoading: (loading: boolean) => {},
});

export const LoadingProvider = ({ children }: any) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
