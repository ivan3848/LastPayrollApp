import { z } from "zod";

const dependantFormSchema = () => {
    const editEntityFormSchema = z.object({
        identification: z
            .string()
            .length(13, { message: "El campo debe tener 13 caracteres." })
            .optional(),
        firstName: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres." })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres.",
            }),
        middleName: z.string().optional(),
        firstLastName: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres." })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres.",
            }),
        secondLastName: z.string().optional(),
        birthDate: z.date({ message: "El campo debe de tener una fecha." }),
        idStatusRelationship: z.number({
            message: "Debe de seleccionar una opción.",
        }),
    });

    const addEntityFormSchema = z.object({
        identification: z
            .string()
            .length(13, { message: "El campo debe tener 13 caracteres." })
            .optional(),
        firstName: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres." })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres.",
            }),
        middleName: z.string().optional(),
        firstLastName: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres." })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres.",
            }),
        secondLastName: z.string().optional(),
        birthDate: z.date({ message: "El campo debe de tener una fecha." }),
        idStatusRelationship: z.number().optional(),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default dependantFormSchema;
