import { NextResponse, type NextRequest } from "next/server";
import { haveAccess } from "./app/(full-page)/auth/services/AuthService";
import { getSession, updateSession } from "./lib";

const routeModuleDictionary: Readonly<{ [key: string]: string }> = {
    "/payrollConfiguration": "CONFIGURACION",
    "/payrollManagement": "REGISTRO_DE_NOMINA",
    "/payrollHistory": "HISTORIAL_DE_NOMINA",
    "/payrollPay": "AREA_NOMINA",
    "/userConfiguration/rol": "ROL",
    "/reports": "REPORTES",
    "/maintenance/location": "UBICACION",
    "/maintenance/calendar": "CALENDARIO",
    "/maintenance/departments": "DEPARTAMENTOS",
    "/maintenance/personalInformation": "INFORMACION_PERSONAL",
    "/userConfiguration": "CONFIGURACION",
    "/massiveChange": "CAMBIOS_MASIVOS",
    "/user": "USUARIO",
    "/role": "ROL",
    "/location": "UBICACION",
    "/assignments": "ASIGNACIONES",
    "/payroll": "NOMINA",
    "/employee": "EMPLEADO",
    "/employeeMaintenance": "EMPLEADO_MANTENIMIENTO",
    "/massiveIncrease": "AUMENTO_MASIVO",
    "/reverseIncrease": "REVERTIR_AUMENTO",
    "/schedulePlan": "PLAN_DE_HORARIO",
    "/terminateEmployee": "DESVINCULAR_EMPLEADO",
    "/bankHistory": "HISTORIAL_BANCARIO",
    "/complementaryData": "DATA_COMPLEMENTARIA",
    "/loan": "PRESTAMO",
    "/benefitDeduction": "BENEFICIO_DEDUCCION",
    "/commissions": "COMISIONES",
    "/contabilization": "CONTABILIZACION",
    "/vacations": "VACACIONES",
    "/reports/dgt": "REPORTES_DGT",
    "/reports/tss": "REPORTES_TSS",
    "/realPayroll": "NOMINA_REAL",
    "/isrInFavor": "ISRINFAVOR",
    "/configuration": "CONFIGURACION",
};

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const pathName = request.nextUrl.pathname;
    const module = routeModuleDictionary[pathName];

    // const modules = routeModuleDictionary[request.nextUrl.pathname];

    // if (!(await haveAccess(modules)).hasPermission)
    //     return NextResponse.redirect(
    //         new URL("/auth/pages/notfound", request.url)
    //     );

    if (!module) return NextResponse.next();

    const hasAccess = session?.rolModule?.some(
        (roleModule) => roleModule.module === module && roleModule.canWrite
    );

    if (!hasAccess) {
        return NextResponse.redirect(
            new URL("/auth/pages/notfound", request.url)
        );
    }

    return await updateSession(request);
}
