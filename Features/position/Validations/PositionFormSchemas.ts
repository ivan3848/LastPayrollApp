import { z } from "zod";

const positionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idPosition: z.number().optional(),
        idDepartment: z.number({ required_error: "El campo es requerido" }),
        idOccupation: z.number({ required_error: "El campo es requerido" }),
        idPositionManager: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        minSalary: z.number().optional(),
        maxSalary: z.number().optional()
    });

    const addEntityFormSchema = z.object({
        idDepartment: z.number({ required_error: "El campo es requerido" }),
        idOccupation: z.number({ required_error: "El campo es requerido" }),
        idPositionManager: z.number().optional(),
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        minSalary: z.number().optional(),
        maxSalary: z.number().optional()
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default positionFormSchemas;