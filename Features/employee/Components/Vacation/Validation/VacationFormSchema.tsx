import { z } from "zod";

const VacationFormSchema = () => {
    const editEntityFormSchema = z.object({
        idVacation: z.number().optional(),
        idEmployee: z.number().optional(),
        start: z.date({ message: "El campo debe de tener una fecha." }),
        end: z.date({ message: "El campo debe de tener una fecha." }),
        paid: z.boolean().optional(),
        totalRemain: z.number().optional(),
        enjoymentDay: z.number().optional(),
        absenteeism: z.number().optional(),
        payrollPayDate: z.date({ message: "El campo debe de tener una fecha." }),
        dayPay: z.number().optional(),
    })
        .refine(data => data.start <= data.end, {
            message: "La fecha de inicio debe ser anterior a la fecha final",
            path: ["end"],
        });

    const addEntityFormSchema = z.object({
        idVacation: z.number().optional(),
        idEmployee: z.number().optional(),
        start: z.date({ message: "El campo debe de tener una fecha." }),
        end: z.date({ message: "El campo debe de tener una fecha." }),
        paid: z.boolean().optional(),
        totalRemain: z.number().optional(),
        enjoymentDay: z.number().optional(),
        reEntryDate: z.date().optional(),
        payrollPayDate: z.date({ message: "El campo debe de tener una fecha." }),
        absenteeism: z.number().optional(),
        dayPay: z.number().optional(),
    })
        .refine(data => data.start <= data.end, {
            message: "La fecha de inicio debe ser anterior a la fecha final",
            path: ["end"],
        });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default VacationFormSchema;
