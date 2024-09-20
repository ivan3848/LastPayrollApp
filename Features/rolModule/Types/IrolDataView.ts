import IRolModuleModule from "./IRolModuleModule";

interface IRolDataView {
    module: string;
    canWrite: boolean;
    rolmodule?: IRolModuleModule[];
}

export const predefinedModules: IRolDataView[] = [
    { module: "USUARIO", canWrite: true },
    { module: "ROL", canWrite: true },
    { module: "UBICACION", canWrite: true },
    { module: "DEPARTAMENTOS", canWrite: true },
    { module: "ASIGNACIONES", canWrite: true },
    { module: "NOMINA", canWrite: true },
    { module: "EMPLEADO", canWrite: true },
    { module: "CALENDARIO", canWrite: true },
    { module: "EMPLEADO_MANTENIMIENTO", canWrite: true },
    { module: "AUMENTO_MASIVO", canWrite: true },
    { module: "REVERTIR_AUMENTO", canWrite: true },
    { module: "PLAN_DE_HORARIO", canWrite: true },
    { module: "DESVINCULAR_EMPLEADO", canWrite: true },
    { module: "HISTORIAL_BANCARIO", canWrite: true },
    { module: "DATA_COMPLEMENTARIA", canWrite: true },
    { module: "PRESTAMO", canWrite: true },
    { module: "BENEFICIO_DEDUCCION", canWrite: true },
    { module: "COMISIONES", canWrite: true },
    { module: "REGISTRO_DE_NOMINA", canWrite: true },
    { module: "HISTORIAL_DE_NOMINA", canWrite: true },
    { module: "AREA_NOMINA", canWrite: true },
    { module: "CONTABILIZACION", canWrite: true },
    { module: "VACACIONES", canWrite: true },
    { module: "REPORTES", canWrite: true },
    { module: "REPORTES_DGT", canWrite: true },
    { module: "REPORTES_TSS", canWrite: true },
    { module: "NOMINA_REAL", canWrite: true },
    { module: "ISRINFAVOR", canWrite: true },
    { module: "ELIMINAR_EMPLEADO", canWrite: true },
    { module: "HORAS_EXTRA", canWrite: true },
    { module: "SUPLENCIA", canWrite: true },
    { module: "PERMISOS_LICENCIAS", canWrite: true },
    { module: "DATA_EXTRAHOURLATENESS", canWrite: true },
    { module: "CONFIGURACION", canWrite: true },
];
