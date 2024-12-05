import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_USER_CONFIGURATION } from "@/constants/cacheKeys";
import emptyImage from "@/constants/emptyImage";
import { DataTablePageEvent } from "primereact/datatable";
import { DataView } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { ProgressSpinner } from "primereact/progressspinner";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { ChangeEvent, useState } from "react";
import useCrudModals from "../../Shared/Hooks/useCrudModals";
import { userServiceWithLogin } from "../Service/userService";
import { IUser } from "../Types/IUser";
import EditUser from "./EditUser";
import ResetUserPassword from "./ResetUserPassword";
import ResetUserStatus from "./ResetUserStatus";
import React from "react";
import { Card } from "primereact/card";
interface Props {
    submitted: boolean;
}

const sortOptions = [
    { label: "Ordenar por...", value: "" },
    { label: "Código de empleado", value: "idEmployee" },
    { label: "Nombre", value: "employeeName" },
];

export default function UserTableWithLogin({ submitted }: Props) {
    const {
        editEntityDialog,
        setEditEntityDialog,
        setDeleteEntityDialog,
        setSubmitted,
        toast,
        deleteEntityDialog,
    } = useCrudModals<IUser>();

    const {
        setPage,
        setPageSize,
        setSorts,
        clearSorts,
        setGlobalFilter,
        params,
    } = useParamFilter(8);

    const [layout] = useState<
        "grid" | "grid" | (string & Record<string, unknown>)
    >("grid");

    const [sortKey, setSortKey] = useState(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [showEditUser, setShowEditUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [userResetPassword, setUserResetPassword] = useState(false);
    const [userResetStatus, setUserResetStatus] = useState(false);
    const [userActive, setUserActive] = useState(false);
    const [userPass, setUserResetPasswordEntityDialog] = useState(false);
    const [userStatus, setUserResetStatusEntityDialog] = useState(false);

    const listOfDependencies: boolean[] = [submitted];

    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_USER_CONFIGURATION,
        userServiceWithLogin
    );

    const onPage = (event: DataTablePageEvent) => {
        setPage(event.page! + 1);
        setPageSize(event.rows);
    };
    const getSeverity = (users: IUser) => {
        switch (users.isActive) {
            case false:
                return "danger";

            default:
                return "success";
        }
    };
    const gridItem = (user: IUser) => {
        const actionButtonStyles = {
            menuItem: {
                minWidth: "110px", // Fixed button width
                height: "8vh", // Fixed button height
            },
        };

        const actionButtons = (userSelected: IUser) => {
            const items = [
                {
                    label: "Opciones",
                    icon: "pi pi-objects-column",
                    items: [
                        {
                            label: "Editar",
                            icon: "pi pi-hammer",
                            command: () => {
                                setUser(userSelected);
                                setShowEditUser(true);
                                setEditEntityDialog(true);
                            },
                        },
                        {
                            label: "Eliminar Usuario",
                            icon: "pi pi-trash",
                            command: () => {
                                setUser(userSelected);
                                setDeleteUser(true);
                                setDeleteEntityDialog(true);
                            },
                        },
                        {
                            label: "Resetear Contraseña",
                            icon: "pi pi-key",
                            command: () => {
                                setUser(userSelected);
                                setUserResetPassword(true);
                                setUserResetPasswordEntityDialog(true);
                            },
                        },
                        ...(userSelected.users[0].isBlock
                            ? [
                                  {
                                      label: "Bloquear",
                                      icon: "pi pi-lock",
                                      command: () => {
                                          setUser(userSelected);
                                          setUserResetStatus(true);
                                          setUserResetStatusEntityDialog(true);
                                      },
                                  },
                              ]
                            : []),
                        ...(!userSelected.users[0].isBlock
                            ? [
                                  {
                                      label: "Desbloquear",
                                      icon: "pi pi-lock-open",
                                      command: () => {
                                          setUser(userSelected);
                                          setUserActive(true);
                                          setUserResetStatusEntityDialog(true);
                                      },
                                  },
                              ]
                            : []),
                    ],
                },
            ];

            return (
                <Menubar
                    model={items}
                    style={{ ...actionButtonStyles.menuItem }}
                />
            );
        };

        return (
            <div className="col-12 sm:col-4 xl:col-3 p-3" key={user.idEmployee}>
                <div
                    className="p-3 border-1 surface-border border-round flex flex-column align-items-center justify-content-between gap-3"
                    style={{ minHeight: "40vh", maxWidth: "450px" }}
                >
                    <div className="flex flex-wrap align-items-center justify-content-between w-full">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-id-card"></i>
                            <span className="font-semibold text-xl">
                                {user.idEmployee}
                            </span>
                        </div>
                        <Tag
                            value={user.isActive ? "Activo" : "Inactivo"}
                            severity={getSeverity(user)}
                        />
                    </div>
                    <div className="flex flex-column align-items-center py-2 w-full">
                        <img
                            className="w-5 h-5 shadow-2 border-circle object-cover"
                            src={user.employeeImage || emptyImage}
                            alt={user.employeeName}
                        />
                        <div
                            className="text-2xl font-bold text-center text-wrap text-truncate"
                            style={{
                                maxWidth: "100%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {user.employeeName}
                        </div>
                    </div>
                    <div>{actionButtons(user)}</div>
                </div>
            </div>
        );
    };

    const itemTemplate = (
        user: IUser,
        layout: "grid" | (string & Record<string, unknown>)
    ) => {
        if (!user) return;
        if (layout === "grid") return gridItem(user);
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-">
            <Dropdown
                value={sortKey}
                options={sortOptions}
                optionLabel="label"
                placeholder="Filtrar por..."
                onChange={(event: DropdownChangeEvent) => {
                    setSortKey(event.value);
                    event.value
                        ? setSorts([{ sortBy: event.value, isAsc: true }])
                        : clearSorts();
                }}
                clearIcon
                filter
                showClear
            />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    value={params.filter.globalFilter}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setGlobalFilter(event.target.value)
                    }
                    placeholder="Buscar..."
                />
            </span>
        </div>
    );

    return (
        <>
            {showEditUser && (
                <EditUser
                    setEditEntityDialog={setEditEntityDialog}
                    setSubmitted={setSubmitted}
                    toast={toast}
                    editEntityDialog={editEntityDialog}
                    id={user!.idEmployee}
                    entity={user!}
                />
            )}
            {deleteUser && (
                <DeleteEntity
                    id={user!.users[0].userId!}
                    endpoint="employee/user"
                    deleteEntityDialog={deleteEntityDialog}
                    setDeleteEntityDialog={setDeleteEntityDialog}
                    setSubmitted={setSubmitted}
                    toast={toast}
                />
            )}
            {userResetPassword && (
                <>
                    <ResetUserPassword
                        id={user!.users[0].userId!}
                        endpoint={"employee/user/resetPassword"}
                        userResetPasswordEntityDialog={userResetPassword}
                        setUserResetPasswordEntityDialog={setUserResetPassword}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                </>
            )}

            {userResetStatus && (
                <>
                    <ResetUserStatus
                        id={user!.users[0].userId!}
                        endpoint={"employee/user/blockUser"}
                        userResetStatusEntityDialog={userResetStatus}
                        setUserResetStatusEntityDialog={setUserResetStatus}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                </>
            )}

            {userActive && (
                <>
                    <ResetUserStatus
                        id={user!.users[0].userId!}
                        endpoint={"employee/user/unlockUser"}
                        userResetStatusEntityDialog={userActive}
                        setUserResetStatusEntityDialog={setUserActive}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                </>
            )}
            <Toast ref={toast} />

            <div className="grid">
                <div className="col-12">
                    <div className="flex justify-content-between mb-5">
                        <h3>Lista De Empleados Con Usuario</h3>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-content-center align-items-center">
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <DataView
                            value={data.items}
                            itemTemplate={itemTemplate}
                            layout={layout}
                            header={header}
                            loading={isLoading}
                            lazy
                            paginator
                            sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                            sortOrder={
                                params.filter?.sorts?.[0]?.isAsc ? 1 : -1
                            }
                            totalRecords={data?.totalCount}
                            className="dataview-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                            emptyMessage="No hay registros para mostrar."
                            onPage={onPage}
                            rowsPerPageOptions={[5, 10, 25]}
                            rows={data?.pageSize!}
                            first={data.firstRow!}
                            currentPageReportTemplate="Mostrando registros del {first} al {last} de {totalRecords}"
                        />
                    )}
                </div>
            </div>
        </>
    );
}
