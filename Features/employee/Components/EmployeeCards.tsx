import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { IEmployee } from "../Types/IEmployee";

interface Props {
    employees: IEmployee[];
}

export default function EmployeeGrid({ employees }: Props) {
    const [layout, setLayout] = useState<
        "list" | "grid" | (string & Record<string, unknown>)
    >("grid");

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
                        className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                        src={`data:image/jpeg;base64,${employee.employeeImage}`}
                        alt={employee.employeeName!}
                    />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">
                                {employee.employeeName}
                            </div>
                            <Rating value={5} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">
                                        {"Desarrollador"}
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
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">
                                {employee.department}
                            </span>
                            <Button
                                icon="pi pi-external-link"
                                className="p-button-rounded"
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
                className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2"
                key={employee.idEmployee}
            >
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">
                                {employee.position}
                            </span>
                        </div>
                        <Tag
                            value={employee.isActive ? "Activo" : "Inactivo"}
                            severity={getSeverity(employee)}
                        ></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img
                            className="w-9 shadow-2 border-round"
                            src={`data:image/jpeg;base64,${employee.employeeImage}`}
                            alt={employee.employeeName!}
                        />
                        <div className="text-2xl font-bold">
                            {employee.employeeName}
                        </div>
                        <Rating value={5} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">
                            {employee.department}
                        </span>
                        <Button
                            icon="pi pi-external-link"
                            className="p-button-rounded"
                            disabled={!employee.isActive}
                        ></Button>
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

    const listTemplate = (
        employees: IEmployee[],
        layout: "list" | "grid" | (string & Record<string, unknown>)
    ) => {
        return (
            <div className="grid grid-nogutter">
                {employees.map((employee, index) =>
                    itemTemplate(employee, layout, index)
                )}
            </div>
        );
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions
                    layout={layout}
                    onChange={(e) => setLayout(e.value)}
                />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView
                value={employees}
                itemTemplate={itemTemplate}
                layout={layout}
                header={header()}
            />
        </div>
    );
}
