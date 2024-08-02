import { z } from "zod";

const employeeContactFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idStatusRelationship: z.number({ required_error: "El campo es requerido" }),
        contactName: z.string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        contactNumber: z.string({ required_error: "El campo es requerido" }).length(12, { message: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
        idStatusRelationship: z.number({ required_error: "El campo es requerido" }),
        contactName: z.string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        contactNumber: z.string({ required_error: "El campo es requerido" }).length(12, { message: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default employeeContactFormSchemas;