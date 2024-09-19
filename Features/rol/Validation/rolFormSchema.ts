import { z } from "zod";

const rolFormSchema = () => {
    const minValue = 5;
    const maxValue = 50;
    const addEntityFormSchema = z.object({
        description: z
            .string()
            .regex(/^(?=.*[A-Z])[a-zA-Z]*$/, {
                message:
                    "El campo solo debe contener letras y al menos una letra mayúscula",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        rolModule: z.any(
            z.object({
                module: z.string(),
                canWrite: z.boolean(),
                rolModuleId: z.number(),
                idRolNumber: z.number(),
            })
        ),
    });

    const editEntityFormSchema = z.object({
        description: z.string().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default rolFormSchema;
