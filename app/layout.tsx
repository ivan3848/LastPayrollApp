"use client";
import { LayoutProvider } from "../layout/context/layoutcontext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import es from "primelocale/es.json";
import { PrimeReactProvider, addLocale, locale } from "primereact/api";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/primereact.css";
import React, { useEffect, useState } from "react";
import "../styles/demo/Demos.scss";
import "../styles/layout/layout.scss";
import { sessionCheck } from "./(full-page)/auth/login/LoginServerActions";
import Login from "./(full-page)/auth/login/page";

interface RootLayoutProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const RootLayout = ({ children }: RootLayoutProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    addLocale("es", es.es);

    useEffect(() => {
        const session = async () => {
            const checkSession = await sessionCheck();
            if (checkSession) setIsLoggedIn(true);
            setIsCheckingAuth(false);
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
                        {isCheckingAuth ? (
                            <ProgressSpinner />
                        ) : isLoggedIn ? (
                            <LayoutProvider>{children}</LayoutProvider>
                        ) : (
                            <>
                                <LayoutProvider>
                                    <Login />
                                </LayoutProvider>
                            </>
                        )}
                    </PrimeReactProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
