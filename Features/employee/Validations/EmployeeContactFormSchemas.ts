import { z } from "zod";

const employeeContactFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idStatusRelationship: z.number({ required_error: "El campo es requerido" }),
        contactName: z.string({ required_error: "El campo es requerido" }),
        contactNumber: z.string({ required_error: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
        idStatusRelationship: z.number({ required_error: "El campo es requerido" }),
        contactName: z.string({ required_error: "El campo es requerido" }),
        contactNumber: z.string({ required_error: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default employeeContactFormSchemas;