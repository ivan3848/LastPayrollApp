import { z } from "zod";

const ExtraHourLatenessFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idExtraHourLateness: z.number().optional(),
            idConcept: z.number({ message: "Debe de elegir un concepto." }),
            idEmployee: z.number().optional(),
            hourAmount: z.number({ message: "Debe agregar cantidad de horas." }),
            date: z.date({ message: "El campo debe de tener una fecha." }),
            typeValue: z.string().optional(),
            idCostCenter: z.string().optional(),
            description: z.string().optional(),
        })

    const addEntityFormSchema = z.object({
        idExtraHourLateness: z.number().optional(),
        idConcept: z.number({ message: "Debe de elegir un concepto." }),
        idEmployee: z.number().optional(),
        hourAmount: z.number({ message: "Debe agregar cantidad de horas." }),
        date: z.date({ message: "El campo debe de tener una fecha." }),
        typeValue: z.string().optional(),
        idCostCenter: z.string().optional(),
        description: z.string().optional(),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default ExtraHourLatenessFormSchema;
