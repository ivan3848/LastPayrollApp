import { AppMenuItem } from "@/types/layout";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: "Mantenimientos",
            icon: "pi pi-fw pi-cog",
            items: [
                {
                    label: "Nómina",
                    icon: "pi pi-fw pi-th-large",
                    to: "/maintenance/payroll",
                },
                {
                    label: "Departamentos",
                    icon: "pi pi-fw pi-warehouse",
                    to: "/maintenance/departments",
                },
                {
                    label: "Asignaciones",
                    icon: "pi pi-fw pi-clipboard",
                    to: "/maintenance/asignation",
                },
                {
                    label: "Información Personal",
                    icon: "pi pi-fw pi-user-edit",
                    to: "/maintenance/personalInformation",
                },
                {
                    label: "Empleados",
                    icon: "pi pi-fw pi-users",
                    to: "/maintenance/employee",
                },
                {
                    label: "Ubicaciones",
                    icon: "pi pi-fw pi-map-marker",
                    to: "/maintenance/location",
                },
                {
                    label: "Calendario",
                    icon: "pi pi-fw pi-calendar",
                    to: "/maintenance/calendar",
                },
            ],
        },
        {
            label: "Empleados",
            icon: "pi pi-fw pi-users",
            items: [
                {
                    label: "Gestión Empleados",
                    icon: "pi pi-fw pi-users",
                    to: "/employee",
                },
                {
                    label: "Agregar Empleado",
                    to: "/employee/addEmployee",
                    icon: "pi pi-user-plus",
                    visible: false,
                },
                {
                    label: "Cambios Masivos",
                    icon: "pi pi-fw pi-chart-bar",
                    to: "/massiveChange",
                },
                {
                    label: `Cambios Masivos / Aumento Masivo`,
                    icon: "pi pi-user-plus",
                    visible: false,
                },
            ],
        },
        {
            label: "GESTION NOMINA",
            icon: "pi pi-fw pi-users",
            items: [
                {
                    label: "Registro de Nómina",
                    icon: "pi pi-fw pi-book",
                    to: "/payrollManagement",
                },
                {
                    label: "Historial de Nómina",
                    icon: "pi pi-fw pi-book",
                    to: "/payrollHistory",
                },
                {
                    label: "Area de Nómina",
                    icon: "pi pi-fw pi-book",
                    to: "/payrollPay",
                },
                {
                    label: "Contabilizacion",
                    icon: "pi pi-fw pi-calculator",
                    to: "/contabilization",
                },
            ],
        },
        {
            label: "REPORTES",
            icon: "pi pi-fw pi-users",
            items: [
                {
                    label: "Reportes",
                    icon: "pi pi-fw pi-book",
                    to: "/reports",
                },
                {
                    label: "Reportes DGT",
                    icon: "pi pi-fw pi-book",
                    to: "/reports/dgt",
                },
                {
                    label: "Reportes TSS",
                    icon: "pi pi-fw pi-book",
                    to: "/reports/tss",
                },
            ],
        },
        {
            label: "GESTION USUARIOS",
            icon: "pi pi-fw pi-users",
            items: [
                {
                    label: "Configuración de Usuarios",
                    icon: "pi pi-fw pi-users",
                    to: "/userConfiguration",
                },

                {
                    label: "Roles",
                    icon: "pi pi-fw pi-bullseye",
                    to: "/userConfiguration/rol",
                },
                {
                    label: "Configuracion de Nomina",
                    icon: "pi pi-fw pi-calculator",
                    to: "/payrollConfiguration",
                },
            ],
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
