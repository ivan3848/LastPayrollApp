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
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useAuthQuery from "@/app/(full-page)/auth/Hook/useAuthQuery";
import { Skeleton } from "primereact/skeleton";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { onMenuToggle, showProfileSidebar, showConfigSidebar } =
        useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const [adminInfo, setAdminInfo] = useState({} as any);
    const { params } = useParamFilter();
    let { data: configData, isFetching } = useAuthQuery(
        params,
        [],
        adminInfo.userId
    );

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
                            {isFetching ? (
                                <>
                                    <Skeleton
                                        width="6rem"
                                        height="1rem"
                                        className="mb-1"
                                    ></Skeleton>
                                    <Skeleton
                                        width="4rem"
                                        height="0.75rem"
                                    ></Skeleton>
                                </>
                            ) : (
                                <>
                                    <span className="block text-sm font-medium text-black dark:text-white">
                                        {adminInfo?.employeeName}
                                    </span>
                                    <span className="block text-xs">
                                        {adminInfo?.rol}
                                    </span>
                                </>
                            )}
                        </span>
                    </li>
                    <li className="topbar-profile">
                        <button
                            type="button"
                            className="p-link"
                            onClick={showProfileSidebar}
                        >
                            {isFetching ? (
                                <Skeleton
                                    shape="circle"
                                    size="2rem"
                                    className="mr-2"
                                ></Skeleton>
                            ) : (
                                <img
                                    src={`${configData.employeeImage}`}
                                    alt="Profile"
                                    style={{
                                        borderRadius: "60%",
                                        transform: "scale(1.06)",
                                    }}
                                />
                            )}
                        </button>
                    </li>
                    <li className="ml-3">
                        {isFetching ? (
                            <Skeleton
                                shape="circle"
                                size="2rem"
                                className="mr-2"
                            ></Skeleton>
                        ) : (
                            <Button
                                type="button"
                                icon="pi pi-cog"
                                text
                                rounded
                                severity="secondary"
                                className="flex-shrink-0"
                                onClick={onConfigButtonClick}
                            ></Button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
