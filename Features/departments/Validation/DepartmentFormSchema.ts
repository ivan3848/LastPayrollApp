import { z } from "zod";

const departmentFormSchemas = () => {
    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, {
                message: "El campo debe tener al menos 2 caracteres",
            })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idCostCenter: z.number({
            required_error: "El campo es requerido",
        }),
        idOrganizationalUnit: z.number({
            required_error: "El campo es requerido",
        }),
    });

    const editEntityFormSchema = z.object({
        idDepartment: z.number().optional(),
        name: z
            .string()
            .min(2, {
                message: "El campo debe tener al menos 2 caracteres",
            })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idCostCenter: z.number({
            required_error: "El campo es requerido",
        }),
        idOrganizationalUnit: z.number({
            required_error: "El campo es requerido",
        }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default departmentFormSchemas;
