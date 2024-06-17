import type { AppTopbarRef } from "@/types";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import AppBreadcrumb from "./AppBreadCrumb";
import { LayoutContext } from "./context/layoutcontext";
import { sessionCheck } from "@/app/(full-page)/auth/login/LoginServerActions";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { onMenuToggle, showProfileSidebar, showConfigSidebar } =
        useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const [adminInfo, setAdminInfo] = useState({} as any);

    const onConfigButtonClick = () => {
        showConfigSidebar();
    };

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
    }));
    useEffect(() => {
        const onProfileSidebarShow = async () => {
            const sessionData = await sessionCheck();
            setAdminInfo(sessionData);
        };

        onProfileSidebarShow();
    }, []);
    return (
        <div className="layout-topbar">
            <div className="topbar-start">
                <button
                    ref={menubuttonRef}
                    type="button"
                    className="topbar-menubutton p-link p-trigger"
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars"></i>
                </button>

                <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb>
            </div>

            <div className="topbar-end">
                <ul className="topbar-menu">
                    <li className="topbar-search">
                        <span
                            className="p-input-icon-left"
                            style={{ display: "none" }}
                        >
                            <i className="pi pi-search"></i>
                            <InputText
                                type="text"
                                placeholder="Search"
                                className="w-12rem sm:w-full"
                            />
                        </span>
                    </li>

                    <li className="topbar-user-logged">
                        <span className="text-right lg:block">
                            <span className="block text-sm font-medium text-black dark:text-white">
                                {adminInfo?.employeeName}
                            </span>
                            <span className="block text-xs">
                                {adminInfo?.rol}
                            </span>
                        </span>
                    </li>
                    <li className="topbar-profile">
                        <button
                            type="button"
                            className="p-link"
                            onClick={showProfileSidebar}
                        >
                            <img
                                src="/layout/images/avatar/avatar.png"
                                alt="Profile"
                            />
                        </button>
                    </li>
                    <li className="ml-3">
                        <Button
                            type="button"
                            icon="pi pi-cog"
                            text
                            rounded
                            severity="secondary"
                            className="flex-shrink-0"
                            onClick={onConfigButtonClick}
                        ></Button>
                    </li>
                </ul>
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
