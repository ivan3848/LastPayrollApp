import { z } from "zod";

const LeasePauseFormSchema = () => {
    const editEntityFormSchema = z
        .object({
            idLeasePause: z.any().optional(),
            idLease: z.any().optional(),
            idEmployeeModify: z.any().optional(),
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
