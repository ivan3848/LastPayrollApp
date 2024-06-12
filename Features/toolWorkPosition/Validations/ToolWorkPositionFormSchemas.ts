import { z } from "zod";

const ToolWorkPositionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idtoolWorkPosition: z.number().optional(),
        idPosition: z.number({ required_error: "El campo es requerido" }),
        idToolWorkDefinition: z.number({ required_error: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
        idPosition: z.number({ required_error: "El campo es requerido" }),
        idToolWorkDefinition: z.number({ required_error: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default ToolWorkPositionFormSchemas;
