import { z } from "zod";

const PermitFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idPermit: z.number().optional(),
            idConcept: z.number({ message: "Debe de elegir un concepto." }),
            idEmployee: z.number().optional(),
            idEmployeeRegister: z.number().optional(),
            idEmployeeAuthorize: z.number().optional(),
            hourAmount: z.number({ message: "El campo tiene que tener un monto." }),
            amount: z.number().optional(),
            startDateTime: z.date({ message: "El campo debe de tener una fecha." }),
            endDateTime: z.date({ message: "El campo debe de tener una fecha." }),
            isToPay: z.boolean().optional(),
            isPaid: z.boolean().optional(),
        })
        .refine(
            (data) => {
                const startDateIsValid =
                    data.startDateTime && !isNaN(Date.parse(data.startDateTime.toISOString()));
                const endDateIsValid =
                    data.endDateTime && !isNaN(Date.parse(data.endDateTime.toDateString()));

                if (startDateIsValid && endDateIsValid) {
                    const start = new Date(data!.startDateTime!);
                    const end = new Date(data!.endDateTime!);
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
        idPermit: z.number().optional(),
        idConcept: z.number({ message: "Debe de elegir un concepto." }),
        idEmployee: z.number().optional(),
        idEmployeeRegister: z.number().optional(),
        idEmployeeAuthorize: z.number().optional(),
        hourAmount: z.number({ message: "El campo tiene que tener un monto." }),
        amount: z.number().optional(),
        startDateTime: z.date({ message: "El campo debe de tener una fecha." }),
        endDateTime: z.date({ message: "El campo debe de tener una fecha." }),
        isToPay: z.boolean().optional(),
        isPaid: z.boolean().optional(),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default PermitFormSchema;
