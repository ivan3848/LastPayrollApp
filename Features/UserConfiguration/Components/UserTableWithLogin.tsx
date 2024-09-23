import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_USER_CONFIGURATION } from "@/constants/cacheKeys";
import emptyImage from "@/constants/emptyImage";
import { Button } from "primereact/button";
import { DataTablePageEvent } from "primereact/datatable";
import { DataView } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
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
interface Props {
    submitted: boolean;
}

const sortOptions = [
    { label: "Ordenar por...", value: "" },
    { label: "Código de empleado", value: "idEmployee" },
    { label: "Nombre", value: "name" },
    { label: "Posición", value: "position" },
    { label: "Departamento", value: "department" },
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
    } = useParamFilter(6);

    const [layout, setLayout] = useState<
        "grid" | "grid" | (string & Record<string, unknown>)
    >("grid");

    const [sortKey, setSortKey] = useState(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [showEditUser, setShowEditUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [userResetPassword, setUserResetPassword] = useState(false);
    const [userResetStatus, setUserResetStatus] = useState(false);
    const [userPass, setUserResetPasswordEntityDialog] = useState(false);
    const [userStatus, setUserResetStatusEntityDialog] = useState(false);

    const listOfDependencies: boolean[] = [submitted];

    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_USER_CONFIGURATION,
        userServiceWithLogin
    );

    const expireQuery = useExpireSessionQuery([CACHE_KEY_USER_CONFIGURATION]);
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
        return (
            <div
                className="col-12 sm:col-6 xl:col-3 m-1 flex justify-content-center flex-wrap gap-4"
                key={user.idEmployee}
            >
                <div className="p-3 border-1 surface-border border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-id-card"></i>
                            <span className="font-semibold text-xl">
                                {user.idEmployee}
                            </span>
                        </div>
                        <Tag
                            value={user.isActive ? "Activo" : "Inactivo"}
                            severity={getSeverity(user!)}
                        ></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-1 py-2">
                        <img
                            className="w-5 shadow-2 border-circle"
                            src={user.employeeImage ?? emptyImage}
                            alt={user.name!}
                        />
                        <div className="text-2xl font-bold">{user.name}</div>
                        <div>
                            <p className="text-sky-400">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sky-400">
                                {user.sindicate
                                    ? "Sindicalizado"
                                    : "No Sindicalizado"}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-content-center flex-wrap gap-1">
                        {actionButtons(user)}
                    </div>
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

    const actionButtons = (userSelected: IUser) => {
        return (
            <>
                <Button
                    size="small"
                    className="min-w-min"
                    label="Editar"
                    icon="pi pi-external-link"
                    onClick={() => {
                        setUser(userSelected);
                        setShowEditUser(true);
                        setEditEntityDialog(true);
                    }}
                />
                <Button
                    size="small"
                    className="min-w-min"
                    label="Eliminar Usuario"
                    icon="pi pi-external-link"
                    onClick={() => {
                        setUser(userSelected);
                        setDeleteUser(true);
                        setDeleteEntityDialog(true);
                    }}
                />

                {/* {
                    <Button
                        size="small"
                        className="min-w-min"
                        label="Resetear Contraseña"
                        icon="pi pi-external-link"
                        onClick={() => {
                            setUser(userSelected);
                            setUserResetPassword(true);
                            setUserResetPasswordEntityDialog(true);
                        }}
                    />
                } */}

                {
                    <Button
                        size="small"
                        className="min-w-min"
                        label={userSelected.isActive ? "Desactivar" : "Activar"}
                        icon="pi pi-external-link"
                        onClick={() => {
                            setUser(userSelected);
                            setUserResetStatus(true);
                            setUserResetStatusEntityDialog(true);
                        }}
                    />
                }
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
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
                <>
                    <DeleteEntity
                        id={user!.users[0].userId!}
                        endpoint="employee/user"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />

                    {expireQuery()}
                </>
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
                        endpoint={"employee/user/activateUser"}
                        userResetStatusEntityDialog={userResetStatus}
                        setUserResetStatusEntityDialog={setUserResetStatus}
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
