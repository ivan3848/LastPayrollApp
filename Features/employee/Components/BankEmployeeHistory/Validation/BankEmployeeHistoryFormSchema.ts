import { z } from "zod";

const BankEmployeeHistoryFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idBank: z.number(),
            accountNumber: z.string().min(4, {
                message: "El campo debe tener al menos 4 caracteres",
            }),
            paymentMethod: z.string().optional(),
            idStatusAccountType: z.number(),
            isDeposit: z.boolean().optional(),
            startDate: z.date({ message: "La fecha de inicio es requerida" }),
            endDate: z.date({ message: "La fecha final es requerida" }),
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

    const addEntityFormSchema = z
        .object({
            accountNumber: z
                .string()
                .min(4, {
                    message: "El campo debe tener al menos 4 caracteres",
                })
                .max(50, {
                    message: "El campo debe tener menos de 50 caracteres",
                }),
            idBank: z.number({
                message: "Necesita elegir un banco",
            }),
            idStatusAccountType: z.number({
                message: "Necesita elegir un método de pago",
            }),
            startDate: z.date({ message: "La fecha de inicio es requerida" }),
            endDate: z.date({ message: "La fecha final es requerida" }),
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

    return { editEntityFormSchema, addEntityFormSchema };
};

export default BankEmployeeHistoryFormSchema;
