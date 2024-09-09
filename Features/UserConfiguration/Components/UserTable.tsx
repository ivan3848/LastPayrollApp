import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_USER_CONFIGURATION } from "@/constants/cacheKeys";
import { Button } from "primereact/button";
import { DataTablePageEvent } from "primereact/datatable";
import emptyImage from "@/constants/emptyImage";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { ChangeEvent, useState } from "react";
import useCrudModals from "../../Shared/Hooks/useCrudModals";
import AddUser from "./AddUser";
import { Toast } from "primereact/toast";
import userServiceWithOut from "../Service/userService";
import { IUser } from "../Types/IUser";
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

export default function UserConfigurationTable({ submitted }: Props) {
    const { addEntityDialog, setAddEntityDialog, setSubmitted, toast } =
        useCrudModals<IUser>();

    const {
        setPage,
        setPageSize,
        setSorts,
        clearSorts,
        setGlobalFilter,
        params,
    } = useParamFilter(6);

    const [layout, setLayout] = useState<
        "list" | "grid" | (string & Record<string, unknown>)
    >("grid");

    const [sortKey, setSortKey] = useState(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [showAddUser, setShowAddUser] = useState(false);
    const listOfDependencies: boolean[] = [submitted];

    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_USER_CONFIGURATION,
        userServiceWithOut
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

    const listItem = (users: IUser, index: number) => {
        return (
            <div className="col-12" key={users.idEmployee}>
                <div
                    className={classNames(
                        "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
                        { "border-top-1 surface-border": index !== 0 }
                    )}
                >
                    <img
                        className="w-7 sm:w-16rem xl:w-7rem shadow-2 block xl:block mx-auto border-circle"
                        src={users.employeeImage ?? emptyImage}
                        alt={users.name!}
                    />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">
                                {users.idEmployee} -{users.name}
                            </div>
                            <div>
                                <p>{users.email}</p>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-warehouse"></i>
                                    <span className="font-semibold">
                                        {users.salary}
                                    </span>
                                </span>
                                <Tag
                                    value={
                                        users.isActive ? "Activo" : "Inactivo"
                                    }
                                    severity={getSeverity(users)}
                                ></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-row align-items-center my-auto gap-1 sm:align-items-center">
                            {actionButtons(user!)}
                        </div>
                    </div>
                </div>
            </div>
        );
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
        layout: "list" | "grid" | (string & Record<string, unknown>),
        index?: number
    ) => {
        if (!user) {
            return;
        }

        if (layout === "list") return listItem(user, index!);
        else if (layout === "grid") return gridItem(user);
    };

    const actionButtons = (userSelected: IUser) => {
        return (
            <>
                <Button
                    size="small"
                    className="min-w-min"
                    label="Add Setting"
                    icon="pi pi-external-link"
                    onClick={() => {
                        setUser(userSelected);
                        setShowAddUser(true);
                        setAddEntityDialog(true);
                    }}
                />
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
            <DataViewLayoutOptions
                layout={layout}
                onChange={(e) => setLayout(e.value)}
            />
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
            <Toast ref={toast} />

            <div className="grid">
                <div className="col-12">
                    <div className="flex justify-content-between mb-5">
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
