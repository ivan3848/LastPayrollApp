import { z } from "zod";

const benefitPositionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idBenefitPosition: z.number().optional(),
        idPosition: z.number({ required_error: "El campo es requerido" }),
        idConcept: z.number({ required_error: "El campo es requerido" }),
        amount: z.number().optional(),
    });

    const addEntityFormSchema = z.object({
        idPosition: z.number({ required_error: "El campo es requerido" }),
        idConcept: z.number({ required_error: "El campo es requerido" }),
        amount: z.number().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default benefitPositionFormSchemas;
