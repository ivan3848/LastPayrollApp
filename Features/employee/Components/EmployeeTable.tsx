import useEntityQuery from "@/Features/Shared/Hooks/useEntityQuery";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import { CACHE_KEY_EMPLOYEE } from "@/constants/cacheKeys";
import { Button } from "primereact/button";
import { DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import employeeService from "../Services/employeeService";
import { IEmployee } from "../Types/IEmployee";

import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { useState } from "react";

interface Props {
    submitted: boolean;
    handleAdd: () => void;
    handleEdit: (entity: IEmployee) => void;
    handleDelete: (entity: IEmployee) => void;
}

const emptyImage =
    "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";
interface Item {
    name: string;
    value: number;
}
export default function EmployeeTable({
    submitted,
    handleDelete,
    handleEdit,
    handleAdd,
}: Props) {
    const {
        setPage,
        setPageSize,
        setFilters,
        setSorts,
        clearSorts,
        clearFilters,
        params,
    } = useParamFilter();

    const [layout, setLayout] = useState<
        "list" | "grid" | (string & Record<string, unknown>)
    >("grid");
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

    const onSort = (event: DataTableSortEvent) => {
        switch (event.sortOrder) {
            case 1:
                setSorts([{ sortBy: event.sortField, isAsc: true }]);
                break;
            case -1:
                setSorts([{ sortBy: event.sortField, isAsc: false }]);
                break;
            default:
                clearSorts();
                break;
        }
    };

    const onFilter = (event: any) => {
        setFilters([
            {
                column: event.field,
                value: event.constraints.constraints?.[0].value,
            },
        ]);
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
                        className="w-5 sm:w-16rem xl:w-7rem shadow-2 block xl:block mx-auto border-circle"
                        src={`data:image/jpeg;base64,${
                            employee.employeeImage ?? emptyImage
                        }`}
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
                        <div className="flex sm:flex-row align-items-center my-auto sm:align-items-center gap-3 sm:gap-2">
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded"
                                label="Editar"
                                disabled={!employee.isActive}
                            ></Button>
                            <Button
                                icon="pi pi-history"
                                className="p-button-rounded"
                                label="Historial"
                                disabled={!employee.isActive}
                            ></Button>
                            <Button
                                icon="pi pi-external-link"
                                className="p-button-rounded"
                                label="Más"
                                disabled={!employee.isActive}
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (employee: IEmployee) => {
        return (
            <div
                className="col-12 sm:col-6 xl:col-4 p-2"
                key={employee.idEmployee}
            >
                <div className="p-4 border-1 surface-border border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
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
                    <div className="flex flex-column align-items-center gap-1 py-2">
                        <img
                            className="w-5 shadow-2 border-circle"
                            src={`data:image/jpeg;base64,${
                                employee.employeeImage ?? emptyImage
                            }`}
                            alt={employee.employeeName!}
                        />
                        <div className="text-2xl font-bold">
                            {employee.employeeName}
                        </div>
                        <div>
                            <p className="text-sky-400">{employee.position}</p>
                        </div>
                        <div>
                            <p className="text-sky-400">
                                {employee.department}
                            </p>
                        </div>
                    </div>
                    <div className="pt-3 mx-5">
                        <span className="p-buttonset">
                            <Button
                                size="small"
                                label="Editar"
                                icon="pi pi-pencil"
                            />
                            <Button
                                size="small"
                                label="Historial"
                                icon="pi pi-history"
                            />
                            <Button
                                size="small"
                                label="Más"
                                icon="pi pi-external-link"
                            />
                        </span>
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

    const header = () => {
        return (
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h3 className="m-0">Empleados</h3>

                <DataViewLayoutOptions
                    layout={layout}
                    onChange={(e) => setLayout(e.value)}
                />
            </div>
        );
    };

    return (
        <DataView
            value={data.items}
            itemTemplate={itemTemplate}
            layout={layout}
            header={header()}
            loading={isLoading}
        />
    );
}
