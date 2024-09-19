import { z } from "zod";

const rolModuleFormSchema = () => {
    const editEntityFormSchema = z.object({
        idStatus: z.number().optional(),
    });

    const addEntityFormSchema = z.object({
        idStatus: z.number().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default rolModuleFormSchema;
