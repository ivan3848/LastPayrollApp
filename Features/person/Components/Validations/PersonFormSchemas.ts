import { z } from "zod";

const personFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idPerson: z.number().optional(),
        identification: z
            .string()
            .length(13, { message: "El campo debe tener 13 caracteres" }),
        firstName: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        middleName: z
            .string()
            .optional(),
        firstLastName: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        secondLastName: z
            .string()
            .optional(),
        employeeImage: z.string().optional(),
        birthDate: z.date().optional(),
        idZone: z.number().optional(),
        idStatusMarital: z.number().optional(),
        idNationality: z.number().optional(),
        address: z.string().optional(),
        email: z.string().email().optional(),
        phoneNumber: z.string().optional(),
        cellphoneNumber: z.string().optional(),

    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default personFormSchemas;