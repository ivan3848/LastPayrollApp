import { Button } from "primereact/button";
import { MegaMenu } from "primereact/megamenu";
import { MenuItem } from "primereact/menuitem";
import { Ripple } from "primereact/ripple";

export default function EmployeeCards() {
    const items: MenuItem[] = [
        {
            label: "Editar",
            icon: "pi pi-pencil",
        },
        {
            label: "Historial",
            icon: "pi pi-history",
        },
        {
            label: "Acciones",
            icon: "pi pi-external-link",
            items: [
                [
                    {
                        label: "Movimientos",
                        items: [
                            { label: "Novedades Salariales" },
                            { label: "Cambio De Posición" },
                            { label: "Cambio De Horario" },
                            { label: "Cubrir Posición" },
                            { label: "Desvincular" },
                            { label: "Eliminar Empleado" },
                        ],
                    },
                ],
                [
                    {
                        label: "Compensación",
                        items: [
                            { label: "Beneficios" },
                            { label: "Deducciones" },
                            { label: "Horas Extras" },
                            { label: "Prestamos" },
                            { label: "Comisiones" },
                            { label: "Incentivos" },
                            { label: "ISR A Favor" },
                        ],
                    },
                ],
                [
                    {
                        label: "Absentismos",
                        items: [
                            { label: "Licencias" },
                            { label: "Permisos" },
                            { label: "Plan De Horario" },
                            { label: "Vacaciones" },
                        ],
                    },
                ],
            ],
        },
    ];


    return (
        <MegaMenu
            model={items}
            orientation="horizontal"
            breakpoint="560px"
            className="p-3 surface-0 shadow-2"
            style={{ borderRadius: "3rem" }}
        />
    );
}
