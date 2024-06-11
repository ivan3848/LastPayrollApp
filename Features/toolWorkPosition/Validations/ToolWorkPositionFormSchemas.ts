import { z } from "zod";

const ToolWorkPositionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idtoolWorkPosition: z.number().optional(),
        idPosition: z.number({ required_error: "La posición es requerida" }),
        idToolWorkDefinition: z.number({ required_error: "La herramienta es requerida" }),
    });

    const addEntityFormSchema = z.object({
        idPosition: z.number({ required_error: "La posición es requerida" }),
        idToolWorkDefinition: z.number({ required_error: "La herramienta es requerida" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default ToolWorkPositionFormSchemas;
