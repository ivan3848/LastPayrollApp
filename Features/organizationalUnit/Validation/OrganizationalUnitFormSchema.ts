import { z } from "zod";

const organizationalUnitFormSchema = () => {
    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, {
                message:
                    "La unidad organizacional debe tener al menos 2 caracteres",
            })
            .max(60, {
                message:
                    "La unidad organizacional debe tener menos de 60 caracteres",
            }),
    });

    const editEntityFormSchema = z.object({
        idOrganizationalUnit: z.number().optional(),
        name: z
            .string()
            .min(2, {
                message:
                    "La unidad organizacional debe tener al menos 2 caracteres",
            })
            .max(60, {
                message:
                    "La unidad organizacional debe tener menos de 60 caracteres",
            }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default organizationalUnitFormSchema;
