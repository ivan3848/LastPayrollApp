import { z } from "zod";

const ISRInFavorFormSchema = () => {
    const editEntityFormSchema = z.object({
        idConcept: z.number({ message: "Debe de elegir un concepto." }),
        date: z.date({ message: "El campo debe de tener una fecha." }),
        originalAmount: z.number({
            message: "El campo tiene que tener un monto.",
        }),
        idIsrInFavor: z.number().optional(),
    });

    const addEntityFormSchema = z.object({
        date: z.date({ message: "El campo debe de tener una fecha." }),
        originalAmount: z.number({
            message: "El campo tiene que tener un monto.",
        }),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default ISRInFavorFormSchema;
