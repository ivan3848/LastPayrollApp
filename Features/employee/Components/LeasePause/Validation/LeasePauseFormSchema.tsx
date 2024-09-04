import { z } from "zod";

const LeasePauseFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idLeasePause: z.number(),
            idLease: z.number(),
            idEmployeeModify: z.number(),
            startPauseDate: z.date({
                message: "El campo debe de tener una fecha.",
            }),
            endPauseDate: z.date({
                message: "El campo debe de tener una fecha.",
            }),
            description: z.string().optional(),
            isPauseActive: z.number().optional(),
        })

        .refine(
            (data) => {
                const startDateIsValid =
                    data.startPauseDate &&
                    !isNaN(Date.parse(data.startPauseDate.toISOString()));
                const endDateIsValid =
                    data.endPauseDate &&
                    !isNaN(Date.parse(data.endPauseDate.toDateString()));

                if (startDateIsValid && endDateIsValid) {
                    const start = new Date(data!.startPauseDate!);
                    const end = new Date(data!.endPauseDate!);
                    const comparison = start < end;
                    return comparison;
                }

                return true;
            },
            {
                message:
                    "La fecha de inicio debe ser anterior a la fecha final",
                path: ["endPauseDate"],
            }
        );

    const addEntityFormSchema = z.object({
        idLeasePause: z.any().optional(),
        idLease: z.any(),
        idEmployeeModify: z.any(),
        startPauseDate: z
            .any({
                message: "El campo debe de tener una fecha.",
            })
            .optional(),
        endPauseDate: z
            .any({
                message: "El campo debe de tener una fecha.",
            })
            .optional(),
        description: z.any().optional(),
        isPauseActive: z.any().optional(),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default LeasePauseFormSchema;
