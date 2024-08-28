import { z } from "zod";

const LicensesFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idWorkSchedulerSubstitute: z.number().optional(),
            idEmployee: z.number().optional(),
            idEmployeeAuthorize: z.number().optional(),
            idWorkScheduler: z.number({ message: "Debe elegir un horario." }),
            description: z.string().optional(),
            startDate: z.date({ message: "El campo debe de tener una fecha." }),
            endDate: z.date({ message: "El campo debe de tener una fecha." }),
        })
        .refine(data => data.startDate <= data.endDate, {
            message: "La fecha de inicio debe ser anterior a la fecha final",
            path: ["endDate"],
        });

    const addEntityFormSchema = z.object({
        idEmployee: z.number().optional(),
        idEmployeeAuthorize: z.number().optional(),
        idWorkScheduler: z.number({ message: "Debe elegir un horario." }),
        description: z.string().optional(),
        startDate: z.date({ message: "El campo debe de tener una fecha." }),
        endDate: z.date({ message: "El campo debe de tener una fecha." }),
    })
    .refine(data => data.startDate <= data.endDate, {
        message: "La fecha de inicio debe ser anterior a la fecha final",
        path: ["endDate"],
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default LicensesFormSchema;
