import React, { useEffect } from "react";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import IRol from "@/Features/rol/Types/IRol";
import useRolModuleByIdRol from "@/Features/rolModule/Hooks/useRolModuleByIdRol";
import { UseFormSetValue } from "react-hook-form";
import { ScrollPanel } from "primereact/scrollpanel";

interface Product<T> {
    id: string;
    module?: string;
    canWrite?: boolean;
    setValue: UseFormSetValue<any>;
    idValue: number;
    intialData: T;
}

export default function BasicDemo<T>({ idValue, id, setValue }: Product<T>) {
    const { params } = useParamFilter();
    const { data, isLoading, error } = useRolModuleByIdRol(params, [], idValue);

    data?.map((item: any) => ({
        id: item.rolModuleId,
        module: item.module,
        canWrite: item.canWrite,
        idValue: item.idRol,
    }));

    useEffect(() => {
        if (idValue) {
            setValue(id, idValue);
        }
    }, [id, idValue, setValue]);

    return (
        <ScrollPanel style={{ width: "100%", height: "10vw" }}>
            <div className="grid grid-nogutter">
                {data?.map((data) => (
                    <div
                        key={data.module}
                        className={classNames("col-12 md:col-4 p-4")}
                    >
                        <div className="card flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-1xl font-bold text-900">
                                {data.module}
                            </div>
                            <div className="flex align-items-center gap-3">
                                <Tag
                                    value={
                                        data.canWrite
                                            ? "Puede Editar y Ver"
                                            : "Puede Ver"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollPanel>
    );
}
