import { z } from "zod";

const newPasswordFormSchema = () => {
    const minValue = 5;
    const maxValue = 50;
    const resetPasswordFormSchema = z.object({
        oldPassword: z
            .string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]*$/, {
                message: "El puede contener letras y numeros.",
            })
            .min(minValue, {
                message: `El campo debe de tener al menos ${minValue} caracteres`,
            })
            .max(maxValue, {
                message: `El campo debe de tener menos ${maxValue} caracteres`,
            }),
        newPassword: z
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
    });

    return { resetPasswordFormSchema };
};

export default newPasswordFormSchema;
