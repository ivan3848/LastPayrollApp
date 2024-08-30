import { z } from "zod";

const LeaseFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idLease: z.number(),
            idEmployee: z.number(),
            idConcept: z.number({ message: "Debe de elegir un concepto." }),
            idRecurrencyStatus: z.number(),
            fees: z.number(),
            amountFee: z.number(),
            totalAmount: z.number(),
            requestDate: z.date({
                message: "El campo debe de tener una fecha.",
            }),

            startDate: z.date({ message: "El campo debe de tener una fecha." }),
            endDate: z.date({ message: "El campo debe de tener una fecha." }),
            monthlyFee: z.number().optional(),
            idBank: z.number().optional(),
            leaseNumber: z.string().optional(),
            description: z.string().optional(),
            idPayrollPay: z.number().optional(),
            paymentMethod: z.boolean().optional(),
            idCompany: z.any().optional(),
            idDepositConcept: z.number(),
            idDiscountConcept: z.number(),
            totalDebt: z.any().optional(),
        })

        .refine(
            (data) => {
                const startDateIsValid =
                    data.startDate &&
                    !isNaN(Date.parse(data.startDate.toISOString()));
                const endDateIsValid =
                    data.endDate &&
                    !isNaN(Date.parse(data.endDate.toDateString()));

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
                path: ["endDate"],
            }
        );

    const addEntityFormSchema = z.object({
        idLease: z.number().optional(),
        idEmployee: z.number().optional(),
        idConcept: z.number({ message: "Debe de elegir un concepto." }),
        idRecurrencyStatus: z.number(),
        fees: z.number().optional(),
        amountFee: z.number(),
        totalAmount: z.number(),
        requestDate: z
            .date({
                message: "El campo debe de tener una fecha.",
            })
            .optional(),
        startDate: z
            .date({ message: "El campo debe de tener una fecha." })
            .optional(),
        endDate: z
            .date({ message: "El campo debe de tener una fecha." })
            .optional(),
        monthlyFee: z.number().optional(),
        idBank: z.number().optional(),
        leaseNumber: z.string().optional(),
        description: z.string().optional(),
        idPayrollPay: z.number().optional(),
        paymentMethod: z.boolean().optional(),
        idCompany: z.number().optional(),
        idDepositConcept: z.number().optional(),
        idDiscountConcept: z.number(),
        totalDebt: z.number().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default LeaseFormSchema;
