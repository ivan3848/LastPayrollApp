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
    { module: "ASIGNACION", canWrite: true },
    { module: "NOMINA", canWrite: true },
    { module: "EMPLEADO", canWrite: true },
    { module: "CALENDARIO", canWrite: true },
    { module: "EMPLEADO_MANTENIMIENTO", canWrite: true },
    { module: "AUMENTO_MASIVO", canWrite: true },
    { module: "REVERTIR_AUMENTO", canWrite: true },
    { module: "HISTORIAL_BANCARIO", canWrite: true },
    { module: "DATA_COMPLEMENTARIA", canWrite: true },
    { module: "REGISTRO_DE_NOMINA", canWrite: true },
    { module: "HISTORIAL_DE_NOMINA", canWrite: true },
    { module: "AREA_NOMINA", canWrite: true },
    { module: "CONTABILIZACION", canWrite: true },
    { module: "REPORTES", canWrite: true },
    { module: "REPORTES_DGT", canWrite: true },
    { module: "REPORTES_TSS", canWrite: true },
    { module: "NOMINA_REAL", canWrite: true },
    { module: "ELIMINAR_EMPLEADO", canWrite: true },
    { module: "HORAS_EXTRA", canWrite: true },
    { module: "SUPLENCIA", canWrite: true },
    { module: "DATA_EXTRAHOURLATENESS", canWrite: true },
    { module: "CONFIGURACION_USUARIO", canWrite: true },
    { module: "CONFIGURACION_NOMINA", canWrite: true },
    { module: "INFORMACION_PERSONAL", canWrite: true },
    { module: "CAMBIOS_MASIVOS", canWrite: true },
    { module: "GESTION_BANCARIA", canWrite: true },
    { module: "DEPENDIENTES", canWrite: true },
    { module: "SEGUROS", canWrite: true },
    { module: "HERRAMIENTAS", canWrite: true },
    { module: "DESVINCULAR", canWrite: true },
    { module: "BENEFICIOS", canWrite: true },
    { module: "DEDUCCIONES", canWrite: true },
    { module: "PRESTAMO", canWrite: true },
    { module: "ISR_A_FAVOR", canWrite: true },
    { module: "COMISIONES", canWrite: true },
    { module: "LICENCIA", canWrite: true },
    { module: "PERMISOS", canWrite: true },
    { module: "HORAS_EXTRAS", canWrite: true },
    { module: "PLAN_DE_HORARIO", canWrite: true },
    { module: "VACACIONES", canWrite: true },
    { module: "SUPLENCIAS", canWrite: true },
];
