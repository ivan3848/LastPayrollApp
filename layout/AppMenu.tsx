import type { MenuModel } from "@/types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const model: MenuModel[] = [
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
                    to: "/employee/employee",
                },
                {
                    label: "Cambios masivos",
                    icon: "pi pi-fw pi-chart-bar",
                    to: "/employee/employee",
                },
                {
                    label: "Horarios to be looked",
                    icon: "pi pi-fw pi-calendar-plus",
                    to: "/employee/workScheduler",
                },
            ],
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
