import { Password } from "primereact/password";
import { z } from "zod";

const userFormSchema = () => {
    const minValue = 5;
    const maxValue = 50;
    const addEntityFormSchema = z.object({
        userName: z
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
    });

    const editEntityFormSchema = z.object({
        idRol: z.number().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default userFormSchema;
