import { z } from "zod";

const BenefitPositionFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idBenefitPosition: z.number().optional(),
        idPosition: z.number({ required_error: "El campo es requerido" }),
        idConcept: z.number({ required_error: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
        idPosition: z.number({ required_error: "El campo es requerido" }),
        idConcept: z.number({ required_error: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default BenefitPositionFormSchemas;
