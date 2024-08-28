import { z } from "zod";

const LicensesFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idLicenses: z.number().optional(),
            idConcept: z.number({ message: "Debe de elegir un concepto." }),
            idEmployee: z.number().optional(),
            idEmployeeRegister: z.number().optional(),
            doctorName: z.string({ message: "El campo tiene que tener un monto." }),
            doctorexequatur: z.string({ message: "El campo tiene que tener un monto." }),
            description: z.string({ message: "El campo tiene que tener un monto." }),
            start: z.date({ message: "El campo debe de tener una fecha." }),
            end: z.date({ message: "El campo debe de tener una fecha." }),
            isToPay: z.boolean().optional(),
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
        idLicenses: z.number().optional(),
        idConcept: z.number({ message: "Debe de elegir un concepto." }),
        idEmployee: z.number().optional(),
        idEmployeeRegister: z.number().optional(),
        doctorName: z.string({ message: "El campo tiene que tener un monto." }),
        doctorexequatur: z.string({ message: "El campo tiene que tener un monto." }),
        description: z.string({ message: "El campo tiene que tener un monto." }),
        start: z.date({ message: "El campo debe de tener una fecha." }),
        end: z.date({ message: "El campo debe de tener una fecha." }),
        isToPay: z.boolean().optional(),
    });
    return { editEntityFormSchema, addEntityFormSchema };
};

export default LicensesFormSchema;
