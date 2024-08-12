import { z } from "zod";

const ProfitFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idConcept: z.number({ message: "Debe de elegir un concepto." }),
            start: z.date({ message: "El campo debe de tener una fecha." }),
            amount: z.number({ message: "El campo tiene que tener un monto." }),
            end: z.date({ message: "El campo debe de tener una fecha." }),
        })
        .refine(
            (data) => {
                const startDateIsValid =
                    data.start && !isNaN(Date.parse(data.start.toISOString()));
                const endDateIsValid =
                    data.end && !isNaN(Date.parse(data.end.toDateString()));

                if (startDateIsValid && endDateIsValid) {
                    const start = new Date(data!.start!);
                    const end = new Date(data!.end!);
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
        idConcept: z.number({ message: "Debe de elegir un concepto." }),

        start: z.date({ message: "El campo debe de tener una fecha." }),
        amount: z.number({ message: "El campo tiene que tener un monto." }),
        end: z.date({ message: "El campo debe de tener una fecha." }),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default ProfitFormSchema;
