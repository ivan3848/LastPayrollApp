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
            ],
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
