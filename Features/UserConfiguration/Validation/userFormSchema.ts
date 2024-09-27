import { z } from "zod";

const userFormSchema = () => {
    const minValue = 5;
    const maxValue = 50;
    const addEntityFormSchema = z.object({
        username: z
            .string()
            .regex(/^[A-Z][a-z]*$/, {
                message:
                    "El campo debe comenzar con una letra mayúscula seguida de letras minúsculas",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        password: z
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]*$/, {
                message:
                    "El campo debe contener al menos una letra mayúscula, una letra minúscula y un número",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        idRol: z.number({
            message: `Debe de elejir una Opción`,
        }),
    });

    const editEntityFormSchema = z.object({
        username: z
            .string()
            .regex(/^[A-Z][a-z]*$/, {
                message:
                    "El campo debe comenzar con una letra mayúscula seguida de letras minúsculas",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        password: z
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]*$/, {
                message:
                    "El campo debe contener al menos una letra mayúscula, una letra minúscula y un número",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        idRol: z.number({
            message: `Debe de elejir una Opción`,
        }),
        userId: z.number().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default userFormSchema;
