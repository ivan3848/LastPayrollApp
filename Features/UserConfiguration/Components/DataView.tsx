import React from "react";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import IRol from "@/Features/rol/Types/IRol";
import useRolModuleByIdRol from "@/Features/rolModule/Hooks/useRolModuleByIdRol";
import { VirtualScroller } from "primereact/virtualscroller";
import { NextPage } from "next";
interface Product<T> {
    id: string;
    module?: string;
    canWrite?: boolean;
    idValue: number;
}

export default function BasicDemo<T>({ idValue }: Product<T>) {
    const { params } = useParamFilter();
    const { data, isLoading, error } = useRolModuleByIdRol(params, [], 1); // Assuming pagination is implemented in the hook.

    const mappedData = data?.map((item: any) => ({
        id: item.rolModuleId,
        module: item.module,
        canWrite: item.canWrite,
        idValue: item.idRol,
    }));
    const getSeverity = (moduleItem: Product<IRol>) => {
        if (moduleItem.canWrite) return "success";
        return "warning";
    };

    const itemTemplate = (moduleItem: Product<T>, options: any) => {
        return (
            <div key={moduleItem.id} className="virtual-item">
                <div
                    className={classNames(
                        "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
                        { "border-top-1 surface-border": options.index !== 0 }
                    )}
                >
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">
                                {moduleItem.module}
                            </div>

                            <div className="flex align-items-center gap-3">
                                <Tag
                                    value={
                                        moduleItem.canWrite
                                            ? "Puede Editar y Ver"
                                            : "Puede Ver"
                                    }
                                    severity={getSeverity(moduleItem)}
                                ></Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card p-5" style={{ maxWidth: "200px" }}>
            <VirtualScroller
                items={data}
                itemTemplate={itemTemplate}
                style={{ height: "300px", width: "15vw" }}
            />
        </div>
    );
}
