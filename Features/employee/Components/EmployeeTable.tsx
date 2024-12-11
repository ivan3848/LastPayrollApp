import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_EMPLOYEE } from "@/constants/cacheKeys";
import emptyImage, { PAGESIZE } from "@/constants/useFullConstants";
import Link from "next/link";
import { Button } from "primereact/button";
import { DataTablePageEvent } from "primereact/datatable";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import React, { ChangeEvent, useState } from "react";
import employeeService from "../Services/employeeService";
import { IEmployee } from "../Types/IEmployee";
import EmployeeActions from "./EmployeeActions";
import { useModuleAccess } from "@/Features/Shared/Hooks/useModuleAccess";

interface Props {
    submitted: boolean;
    toast: React.MutableRefObject<any>;
}

const sortOptions = [
    { label: "Ordenar por...", value: "" },
    { label: "Código de empleado", value: "idEmployee" },
    { label: "Nombre", value: "name" },
    { label: "Posición", value: "position" },
    { label: "Departamento", value: "department" },
];

export default function EmployeeTable({ submitted }: Props) {
    const {
        setPage,
        setPageSize,
        setSorts,
        clearSorts,
        setGlobalFilter,
        params,
    } = useParamFilter(PAGESIZE);
    const haveAccess = "EMPLEADO";

    const [layout, setLayout] = useState<
        "list" | "grid" | (string & Record<string, unknown>)
    >("grid");
    const [isLoadingButton, setLoadingButton] = useState(false);
    const [sortKey, setSortKey] = useState(null);
    const [employee, setEmployee] = useState<IEmployee | null>(null);
    const [showEmployeeActions, setShowEmployeeActions] = useState(false);
    const canWrite = useModuleAccess(haveAccess);
    const listOfDependencies: boolean[] = [submitted];
    const { data, isLoading } = useEntityQuery(
        params,
        listOfDependencies,
        CACHE_KEY_EMPLOYEE,
        employeeService
    );

    const onPage = (event: DataTablePageEvent) => {
        setPage(event.page! + 1);
        setPageSize(event.rows);
    };

    const getSeverity = (employee: IEmployee) => {
        switch (employee.isActive) {
            case false:
                return "danger";

            default:
                return "success";
        }
    };

    const listItem = (employee: IEmployee, index: number) => {
        return (
            <div className="col-12" key={employee.idEmployee}>
                <div
                    className={classNames(
                        "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
                        { "border-top-1 surface-border": index !== 0 }
                    )}
                >
                    <img
                        className="w-7 sm:w-16rem xl:w-7rem shadow-2 block xl:block mx-auto border-circle"
                        src={employee.employeeImage ?? emptyImage}
                        alt={employee.employeeName!}
                    />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">
                                {employee.idEmployee} -{employee.employeeName}
                            </div>
                            <div>
                                <p>{employee.position}</p>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-warehouse"></i>
                                    <span className="font-semibold">
                                        {employee.department}
                                    </span>
                                </span>
                                <Tag
                                    value={
                                        employee.isActive
                                            ? "Activo"
                                            : "Inactivo"
                                    }
                                    severity={getSeverity(employee)}
                                ></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-row align-items-center my-auto gap-1 sm:align-items-center">
                            {actionButtons(employee)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (employee: IEmployee) => {
        return (
            <div
                className="col-12 sm:col-4 xl:col-3 p-3"
                key={employee.idEmployee}
            >
                <div
                    className="p-3 border-1 surface-border border-round flex flex-column align-items-center justify-content-between gap-3"
                    style={{ minHeight: "15wh", maxWidth: "15wh" }}
                >
                    <div className="flex flex-wrap align-items-center justify-content-between  w-full">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-id-card"></i>
                            <span className="font-semibold text-xl">
                                {employee.idEmployee}
                            </span>
                        </div>
                        <Tag
                            value={employee.isActive ? "Activo" : "Inactivo"}
                            severity={getSeverity(employee)}
                        ></Tag>
                    </div>
                    <div className="flex flex-column align-items-center py-2 w-full">
                        <img
                            className="w-5 h-5 shadow-2 border-circle object-cover"
                            src={employee.employeeImage ?? emptyImage}
                            alt={employee.employeeName!}
                        />
                        <div className="text-2xl font-bold text-center text-wrap">
                            {employee.employeeName}
                        </div>
                        <div>
                            <p className="text-sky-400 text-center">
                                {employee.position}
                            </p>
                        </div>
                        <div>
                            <p className="text-sky-400 text-center">
                                {employee.department}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-content-center flex-wrap gap-1 w-full">
                        {actionButtons(employee)}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (
        employee: IEmployee,
        layout: "list" | "grid" | (string & Record<string, unknown>),
        index?: number
    ) => {
        if (!employee) {
            return;
        }

        if (layout === "list") return listItem(employee, index!);
        else if (layout === "grid") return gridItem(employee);
    };

    const actionButtons = (employeeSelected: IEmployee) => {
        return (
            <>
                <Link
                    href={{
                        pathname: "/employee/editEmployee",
                        query: { id: employeeSelected.idEmployee },
                    }}
                >
                    {canWrite && (
                        <Button
                            size="small"
                            className="min-w-min"
                            label="Editar"
                            icon="pi pi-pencil"
                            loading={isLoadingButton}
                            onClick={() => {
                                setLoadingButton(true);
                                setTimeout(() => setLoadingButton(false), 2000);
                            }}
                        />
                    )}
                </Link>
                <Button
                    size="small"
                    className="min-w-min"
                    label="Acciones"
                    icon="pi pi-external-link"
                    onClick={() => {
                        setEmployee(employeeSelected);
                        setShowEmployeeActions(true);
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
            <EmployeeActions
                showEmployeeActions={showEmployeeActions}
                setShowEmployeeActions={setShowEmployeeActions}
                employee={employee!}
            />

            <div className="grid">
                <div className="col-12">
                    <div className="flex justify-content-between mb-5">
                        <h3>Empleados</h3>

                        <Link href="/employee/addEmployee">
                            {canWrite && (
                                <Button
                                    label="Agregar Empleado"
                                    icon="pi pi-user-plus"
                                    loading={isLoadingButton}
                                    onClick={() => {
                                        setLoadingButton(true);
                                        setTimeout(
                                            () => setLoadingButton(false),
                                            2000
                                        );
                                    }}
                                />
                            )}
                        </Link>
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
