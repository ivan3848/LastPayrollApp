import { z } from "zod";

const userFormSchema = () => {
    const minValue = 5;
    const maxValue = 50;
    const addEntityFormSchema = z.object({
        username: z
            .string()
            .regex(/^[a-zA-Z_]*$/, {
                message: "El campo solo puede contener letras y guiones bajos",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        password: z
            .string()
            .regex(/^[a-zA-Z0-9_]*$/, {
                message:
                    "El campo solo puede contener letras, números y guiones bajos",
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
            .regex(/^[a-zA-Z0-9_]*$/, {
                message:
                    "El campo solo puede contener letras, números y guiones bajos",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        password: z
            .string()
            .regex(/^[a-zA-Z0-9_]*$/, {
                message:
                    "El campo solo puede contener letras, números y guiones bajos",
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
        userId: z.string().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default userFormSchema;
