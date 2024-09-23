import { z } from "zod";

const newPasswordFormSchema = () => {
    const resetPasswordFormSchema = z.object({
        oldPassword: z
            .string({ required_error: "La contraseña es requerida" })
            .min(6, {
                message: "La contraseña debe tener al menos 6 caracteres",
            })
            .max(50, {
                message: "La contraseña debe tener un máximo de 50 caracteres",
            }),
        password: z
            .string({ required_error: "La contraseña es requerida" })
            .min(6, {
                message: "La contraseña debe tener al menos 6 caracteres",
            })
            .max(50, {
                message: "La contraseña debe tener un máximo de 50 caracteres",
            }),
    });

    return { resetPasswordFormSchema };
};

export default newPasswordFormSchema;
