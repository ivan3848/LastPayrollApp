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
        birthDate: z.date({ required_error: "El campo es requerido" }).refine((date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
                return age - 1 >= 18;
            }
            return age >= 18;
        }, {
            message: "La persona debe ser mayor de edad (18 años o más)",
        }),
        idStatusMarital: z.number().optional(),
        idNationality: z.number({ required_error: "El campo es requerido" }),
        idGender: z.number({ required_error: "El campo es requerido" }),
        idEducation: z.number({ required_error: "El campo es requerido" }),
        address: z.string().optional(),
        email: z.string().email({ message: "El campo es requerido" }).optional(),
        phoneNumber: z.string().optional(),
        cellphoneNumber: z.string({ message: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
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
        birthDate: z.date({ required_error: "El campo es requerido" }).refine((date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
                return age - 1 >= 18;
            }
            return age >= 18;
        }, {
            message: "La persona debe ser mayor de edad (18 años o más)",
        }),
        idStatusMarital: z.number().optional(),
        idNationality: z.number({ required_error: "El campo es requerido" }),
        idGender: z.number({ required_error: "El campo es requerido" }),
        idEducation: z.number({ required_error: "El campo es requerido" }),
        address: z.string().optional(),
        email: z.string().email({ message: "El campo es requerido" }).optional(),
        phoneNumber: z.string().optional(),
        cellphoneNumber: z.string({ message: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default personFormSchemas;