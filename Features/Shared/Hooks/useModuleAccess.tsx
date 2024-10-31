import { sessionCheck } from "@/app/(full-page)/auth/login/LoginServerActions";
import IRolModule from "@/Features/rolModule/Types/IRolModule";
import { useEffect, useState } from "react";

const accessCache: { [accessName: string]: boolean } = {};

const hasModuleAccess = (module: IRolModule[] | null, accessName: string) => {
    return module?.some(
        (mod) => mod.module === accessName && mod.canWrite === true
    );
};

export const useModuleAccess = (accessName: string) => {
    const [canWrite, setCanWrite] = useState<boolean>(false);

    useEffect(() => {
        if (accessCache[accessName] !== undefined) {
            setCanWrite(accessCache[accessName]);
            return;
        }

        sessionCheck().then((res) => {
            const module = res?.rolModule ?? [];
            const accessResult = hasModuleAccess(module, accessName ?? "");
            accessCache[accessName] = accessResult!;
            setCanWrite(accessResult!);
        });
    }, [accessName]);

    return canWrite;
};
