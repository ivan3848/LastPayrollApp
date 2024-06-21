import Link from "next/link";
import { useContext } from "react";
import AppMenu from "./AppMenu";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { LayoutState } from "../types/layout";
import { Button } from "primereact/button";

const AppSidebar = () => {
    const { setLayoutState } = useContext(LayoutContext);
    const anchor = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            anchored: !prevLayoutState.anchored,
        }));
    };
    return (
        <>
            <div className="sidebar-header">
                <Link href="/" className="app-logo">
                    <svg
                        width="300"
                        height="40"
                        viewBox="10 -18 320 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="app-logo-normal"
                    >
                        <text
                            x="5"
                            y="32"
                            fill="var(--logo-color)"
                            fontFamily="Arial"
                            fontSize="39.8"
                            fontWeight="bold"
                        >
                            SPECIALISTNOM
                        </text>
                    </svg>
                    <svg
                        width="21"
                        height="22"
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="app-logo-small"
                    >
                        <path
                            d="M10.4851 0L0 20.9465H3.53702L10.4856 6.07843L17.2944 20.9465H20.9715L10.4851 0Z"
                            fill="var(--logo-color)"
                        />
                        <path
                            d="M13.8399 15.793L16.2076 21.0019H11.7681L13.8399 15.793Z"
                            fill="var(--logo-color)"
                        />
                        <path
                            d="M9.04637 21.0019L6.67867 15.793L4.60693 21.0019H9.04637Z"
                            fill="var(--logo-color)"
                        />
                    </svg>
                </Link>
                <button
                    className="layout-sidebar-anchor p-link z-2 mb-2"
                    type="button"
                    onClick={anchor}
                ></button>
            </div>

            <div className="layout-menu-container">
                <MenuProvider>
                    <AppMenu />
                </MenuProvider>
            </div>
        </>
    );
};

export default AppSidebar;
