import type { MenuModel } from "@/types";
import AppSubMenu from "./AppSubMenu";

const AppMenu = () => {
    const model: MenuModel[] = [
        {
            label: "Mantenimientos",
            icon: "pi pi-fw pi-cog",
            items: [
                {
                    label: "Ubicaciones",
                    icon: "pi pi-fw pi-map-marker",
                    to: "/maintenance/location",
                },
                {
                    label: "Asignaciones",
                    icon: "pi pi-fw pi-users",
                    to: "/maintenance/asignation",
                },
                {
                    label: "Departamentos",
                    icon: "pi pi-fw pi-users",
                    to: "/maintenance/departments",
                },
                {
                    label: "Nómina",
                    icon: "pi pi-fw pi-th-large",
                    to: "/maintenance/payroll",
                },
                {
                    label: "Empleados",
                    icon: "pi pi-fw pi-users",
                    to: "/maintenance/employee",
                },
            ],
        },
        {
            label: "Empleado",
            icon: "pi pi-fw pi-cog",
            items: [
                {
                    label: "Cambio De Horario",
                    icon: "pi pi-fw pi-map-marker",
                    to: "/employee/workscheduler",
                },
            ],
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
