"use client";
import { LayoutProvider } from "../layout/context/layoutcontext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider, addLocale, locale } from "primereact/api";
import "primereact/resources/primereact.css";
import { useEffect, useState } from "react";
import "../styles/demo/Demos.scss";
import "../styles/layout/layout.scss";
import { sessionCheck } from "./(full-page)/auth/login/LoginServerActions";
import Login from "./(full-page)/auth/login/page";
import es from "primelocale/es.json";

interface RootLayoutProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const RootLayout = ({ children }: RootLayoutProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    addLocale("es", es.es);

    useEffect(() => {
        const session = async () => {
            const checkSession = await sessionCheck();
            if (checkSession) setIsLoggedIn(true);
        };
        session();
        locale("es");
    }, []);

    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link
                    id="theme-link"
                    href={`/theme/theme-light/indigo/theme.css`}
                    rel="stylesheet"
                ></link>
            </head>
            <body>
                <QueryClientProvider client={queryClient}>
                    <PrimeReactProvider>
                        {isLoggedIn ? (
                            <LayoutProvider>{children}</LayoutProvider>
                        ) : (
                            <Login />
                        )}
                    </PrimeReactProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
