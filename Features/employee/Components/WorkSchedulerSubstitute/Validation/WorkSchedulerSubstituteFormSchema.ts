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
        .refine(
            (data) => {
                const startDateIsValid =
                    data.startDate && !isNaN(Date.parse(data.startDate.toISOString()));
                const endDateIsValid =
                    data.endDate && !isNaN(Date.parse(data.endDate.toDateString()));

                if (startDateIsValid && endDateIsValid) {
                    const start = new Date(data!.startDate!);
                    const end = new Date(data!.endDate!);
                    const comparison = start < end;
                    return comparison;
                }

                return true;
            },
            {
                message:
                    "La fecha de inicio debe ser anterior a la fecha final",
                path: ["end"],
            }
        );

    const addEntityFormSchema = z.object({
        idEmployee: z.number().optional(),
        idEmployeeAuthorize: z.number().optional(),
        idWorkScheduler: z.number({ message: "Debe elegir un horario." }),
        description: z.string().optional(),
        startDate: z.date({ message: "El campo debe de tener una fecha." }),
        endDate: z.date({ message: "El campo debe de tener una fecha." }),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default LicensesFormSchema;
