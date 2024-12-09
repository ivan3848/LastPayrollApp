import Link from "next/link";
import { useContext } from "react";
import AppMenu from "./AppMenu";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { LayoutState } from "../types/layout";
import YourSvg from "./images/WorkingWithlogo.svg";
import Image from "next/image";

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
            <div
                className="sidebar-header"
                style={{ paddingBottom: 14, paddingTop: 14 }}
            >
                <Link href="/employee" className="app-logo">
                    <div
                        style={{
                            width: 300,
                            height: 85,
                            overflow: "hidden",
                            // zoom: "75%",
                        }}
                    >
                        <Image
                            src={YourSvg}
                            alt="specialistNOM logo"
                            width={300}
                            height={200}
                        />
                    </div>
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
