import { z } from "zod";

const benefitPositionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idbenefitPosition: z.number().optional(),
        idPosition: z.number({ required_error: "La posición es requerida" }),
        idConcept: z.number({ required_error: "El concepto es requerido" }),
    });

    const addEntityFormSchema = z.object({
        idPosition: z.number({ required_error: "La posición es requerida" }),
        idConcept: z.number({ required_error: "El concepto es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default benefitPositionFormSchemas;