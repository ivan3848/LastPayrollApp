import { z } from "zod";

const departmentFormSchemas = () => {
    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, {
                message: "El Departamento debe tener al menos 2 caracteres",
            })
            .max(100, {
                message: "El Departamento debe tener menos de 100 caracteres",
            }),
        idCostCenter: z.number({
            required_error: "Centro de Costos es requerido",
        }),
        idOrganizationalUnit: z.number({
            required_error: "Unidad Organizacional es requerida",
        }),
    });

    const editEntityFormSchema = z.object({
        idDepartment: z.number().optional(),
        name: z
            .string()
            .min(2, {
                message: "El Departamento debe tener al menos 2 caracteres",
            })
            .max(100, {
                message: "El Departamento debe tener menos de 100 caracteres",
            }),
        idCostCenter: z.number({
            required_error: "Centro de Costos es requerido",
        }),
        idOrganizationalUnit: z.number({
            required_error: "Unidad Organizacional es requerida",
        }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default departmentFormSchemas;
