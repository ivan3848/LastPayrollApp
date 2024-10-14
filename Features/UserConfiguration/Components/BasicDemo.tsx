import useParamFilter from "@/Features/Shared/Hooks/useParamFilter";
import useRolModuleByIdRol from "@/Features/rolModule/Hooks/useRolModuleByIdRol";
import { ScrollPanel } from "primereact/scrollpanel";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

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
        <ScrollPanel style={{ width: "10vw%", height: "10vw" }}>
            <div className="grid ">
                {data?.map((data) => (
                    <div
                        key={data.module}
                        className={classNames("col-12 md:col-4 p-4")}
                    >
                        <div className="card flex flex-column align-items-center   gap-3">
                            <div>{data.module}</div>
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
