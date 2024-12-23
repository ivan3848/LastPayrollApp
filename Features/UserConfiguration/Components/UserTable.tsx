import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_USER_CONFIGURATION_WITH_LOGIN } from "@/constants/cacheKeys";
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
import userServiceWithOut from "../Service/userService";
import { IUser } from "../Types/IUser";
import AddUser from "./AddUser";
import ResetUserStatus from "./ResetUserStatus";
import emptyImage, { PAGESIZE } from "@/constants/useFullConstants";

interface Props {
    submitted: boolean;
}
const sortOptionsMap = {
    "": "Ordenar por...",
    idEmployee: "Código de empleado",
    employeeName: "Nombre",
};
const sortOptions = Object.entries(sortOptionsMap).map(([value, label]) => ({
    label,
    value,
}));

export default function UserTable({ submitted }: Props) {
    const { addEntityDialog, setAddEntityDialog, setSubmitted, toast } =
        useCrudModals<IUser>();
    const [userResetStatus, setUserResetStatus] = useState(false);
    const [userStatus, setUserResetStatusEntityDialog] = useState(false);

    const {
        setPage,
        setPageSize,
        setSorts,
        clearSorts,
        setGlobalFilter,
        params,
    } = useParamFilter(PAGESIZE);

    const [sortKey, setSortKey] = useState(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [showAddUser, setShowAddUser] = useState(false);

    const { data, isLoading } = useEntityQuery(
        params,
        [submitted],
        CACHE_KEY_USER_CONFIGURATION_WITH_LOGIN,
        userServiceWithOut
    );

    const onPage = (event: DataTablePageEvent) => {
        setPage(event.page! + 1);
        setPageSize(event.rows);
    };

    const getSeverity = (users: IUser) => {
        return users.isActive ? "success" : "danger";
    };

    const gridItem = (user: IUser) => {
        return (
            <div className="col-12 sm:col-4 xl:col-3 p-3" key={user.idEmployee}>
                <div
                    className="p-3 border-1 surface-border border-round flex flex-column align-items-center justify-content-between gap-3"
                    style={{ minHeight: "40vh", maxWidth: "450px" }}
                >
                    <div className="flex flex-wrap align-items-center justify-content-between  w-full">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-id-card"></i>
                            <span className="font-semibold text-xl">
                                {user.idEmployee}
                            </span>
                        </div>
                        <Tag
                            value={user.isActive ? "Activo" : "Inactivo"}
                            severity={getSeverity(user)}
                        ></Tag>
                    </div>
                    <div className="flex flex-column align-items-center py-2 w-full">
                        <img
                            className="w-5 h-5 shadow-2 border-circle object-cover"
                            src={user.employeeImage ?? emptyImage}
                            alt={user.employeeName!}
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
                    <div className="flex justify-content-center flex-wrap gap-1 w-full">
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
            <div className="flex justify-content-center w-full">
                {userSelected?.users?.length === 0 ? (
                    <Button
                        size="small"
                        className="min-w-min"
                        label="Agregar Usuario"
                        icon="pi pi-external-link"
                        onClick={() => {
                            setUser(userSelected);
                            setShowAddUser(true);
                            setAddEntityDialog(true);
                        }}
                    />
                ) : (
                    <Button
                        size="small"
                        className="min-w-min"
                        label={userSelected.isActive ? "Activar" : "Desactivar"}
                        icon="pi pi-external-link"
                        onClick={() => {
                            setUser(userSelected);
                            setUserResetStatus(true);
                            setUserResetStatusEntityDialog(true);
                        }}
                    />
                )}
            </div>
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
            {showAddUser && (
                <AddUser
                    id={user!.idEmployee}
                    addEntityDialog={addEntityDialog}
                    setAddEntityDialog={setAddEntityDialog}
                    setSubmitted={setSubmitted}
                    toast={toast}
                />
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
            <div
                style={{
                    display: "grid",
                    width: "100%",
                }}
            >
                <div className="flex justify-content-between  ">
                    <h3>Lista de Empleados Sin Usuario</h3>
                </div>
                {isLoading ? (
                    <div className="flex justify-content-center align-items-center">
                        <ProgressSpinner />
                    </div>
                ) : (
                    <DataView
                        value={data.items}
                        itemTemplate={itemTemplate}
                        layout={"grid"}
                        header={header}
                        loading={isLoading}
                        lazy
                        paginator
                        sortField={params.filter?.sorts?.[0]?.sortBy ?? ""}
                        sortOrder={params.filter?.sorts?.[0]?.isAsc ? 1 : -1}
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
        </>
    );
}
