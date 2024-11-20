import { z } from "zod";

const LeaseFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idLease: z.number(),
            idEmployee: z.number(),
            idConcept: z.number({ message: "Debe de elegir un concepto." }),
            idRecurrencyStatus: z.number({
                message: "Debe de una recurrencia de pago",
            }),
            fees: z.number().optional(),
            amountFee: z.number().optional(),
            totalAmount: z.number({
                message: "Debe tener las cuotas",
            }),
            requestDate: z.date({
                message: "El campo debe de tener una fecha.",
            }),
            startDate: z.date({ message: "El campo debe de tener una fecha." }),
            endDate: z.date({ message: "El campo debe de tener una fecha." }),
            monthlyFee: z.number().optional(),
            idBank: z.number({ message: "Se debe seleccionar el banco" }),
            leaseNumber: z.string({
                message: "Debe de ingresar un número de préstamo",
            }),
            description: z.string().optional(),
            idPayrollPay: z.number().optional(),
            paymentMethod: z.boolean({
                message: "Debe de seleccionar un método de pago",
            }),
            idCompany: z.number().optional(),
            idDepositConcept: z.number({
                message: "Debe de seleccionar un concepto",
            }),
            idDiscountConcept: z.number({
                message: "Debe de seleccionar un concepto",
            }),
            totalDebt: z.number().optional(),
            recurrency: z.string().optional(),
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
        idRecurrencyStatus: z.number({
            message: "Debe de una recurrencia de pago",
        }),
        fees: z.number().optional(),
        amountFee: z.number().optional(),
        totalAmount: z.number({
            message: "Debe tener las cuotas",
        }),
        requestDate: z.date({
            message: "El campo debe de tener una fecha.",
        }),
        startDate: z.date({ message: "El campo debe de tener una fecha." }),
        endDate: z.date({ message: "El campo debe de tener una fecha." }),
        monthlyFee: z.number().optional(),
        idBank: z.number({ message: "Se debe seleccionar el banco" }),
        leaseNumber: z.string({
            message: "Debe de ingresar un número de préstamo",
        }),
        description: z.string().optional(),
        idPayrollPay: z.number().optional(),
        paymentMethod: z.boolean({
            message: "Debe de seleccionar un método de pago",
        }),
        idCompany: z.number().optional(),
        idDepositConcept: z.number().optional(),
        idDiscountConcept: z.number().optional(),
        totalDebt: z.number().optional(),
        recurrency: z.string().optional(),
    });



    return { editEntityFormSchema, addEntityFormSchema };
};

export default LeaseFormSchema;
