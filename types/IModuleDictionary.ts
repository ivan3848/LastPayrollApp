export const IModuleDictionary: Readonly<{ [key: string]: string }> = {
    // MAINTENANCE
    "/maintenance/payroll": "NOMINA",
    "/maintenance/departments": "DEPARTAMENTOS",
    "/maintenance/asignation": "ASIGNACION",
    "/maintenance/personalInformation": "INFORMACION_PERSONAL",
    "/maintenance/employee": "EMPLEADO_MANTENIMIENTO",
    "/maintenance/location": "UBICACION",
    "/maintenance/calendar": "CALENDARIO",

    //EMPLOYEE
    "/employee": "EMPLEADO",
    "/massiveChange": "CAMBIOS_MASIVOS",

    //PAYROLL
    "/payrollManagement": "REGISTRO_DE_NOMINA",
    "/payrollHistory": "HISTORIAL_DE_NOMINA",
    "/payrollPay": "AREA_NOMINA",
    "/contabilization": "CONTABILIZACION",

    //REPORTS
    "/reports": "REPORTES",
    "/reports/dgt": "REPORTES_DGT",
    "/reports/tss": "REPORTES_TSS",

    //USERS
    "/userConfiguration/rol": "ROL",
    "/userConfiguration": "CONFIGURACION_USUARIO",
    "/payrollConfiguration": "CONFIGURACION_NOMINA",
};

export const IModuleAccess: Readonly<{ [key: string]: string }> = {
    // MAINTENANCE

    NOMINA: "/maintenance/payroll",
    DEPARTAMENTOS: "/maintenance/departments",
    ASIGNACION: "/maintenance/asignation",
    INFORMACION_PERSONAL: "/maintenance/personalInformation",
    EMPLEADO_MANTENIMIENTO: "/maintenance/employee",
    UBICACION: "/maintenance/location",
    CALENDARIO: "/maintenance/calendar",

    //EMPLOYEE
    EMPLEADO: "/employee",
    CAMBIOS_MASIVOS: "/massiveChange",

    //PAYROLL
    CONFIGURACION_NOMINA: "/payrollConfiguration",
    REGISTRO_DE_NOMINA: "/payrollManagement",
    HISTORIAL_DE_NOMINA: "/payrollHistory",
    AREA_NOMINA: "/payrollPay",
    REPORTES_DGT: "/reports/dgt",

    //REPORTS
    REPORTES: "/reports",
    REPORTES_TSS: "/reports/tss",

    //EMPLOYEE ACTIONS
    AUMENTO_MASIVO: "/massiveIncrease",
    REVERTIR_AUMENTO: "/reverseIncrease",
    PLAN_DE_HORARIO: "/schedulePlan",
    HISTORIAL_BANCARIO: "/bankHistory",
    DATA_COMPLEMENTARIA: "/complementaryData",
    BENEFICIO_DEDUCCION: "/benefitDeduction",
    COMISIONES: "/commissions",
    CONTABILIZACION: "/contabilization",
    VACACIONES: "/vacations",
    NOMINA_REAL: "/realPayroll",
    ISRINFAVOR: "/isrInFavor",
    PRESTAMO: "/PRESTAMO",
    DEPENDIENTES: "/dependants",
    GESTION_BANCARIA: "/vacationManagement",
    HERRAMIENTAS: "/toolWorkDefinitionEmployee",
    ISR_A_FAVOR: "/isrInFavor",
    PERMISOS: "/permit",

    //USERS
    CONFIGURACION_USUARIO: "/userConfiguration",

    ROL: "/userConfiguration/rol",
    USUARIO: "/userConfiguration",
};
