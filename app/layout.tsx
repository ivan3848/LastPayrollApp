"use client";
import { LayoutProvider } from "../layout/context/layoutcontext";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "../styles/demo/Demos.scss";
import "../styles/layout/layout.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./(full-page)/auth/login/page";
import { Suspense, useEffect, useState } from "react";

interface RootLayoutProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en" suppressHydrationWarning>
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
                        <LayoutProvider>{children}</LayoutProvider>
                    </PrimeReactProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}

export default RootLayout;
