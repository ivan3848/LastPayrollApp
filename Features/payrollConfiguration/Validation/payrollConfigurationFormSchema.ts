import { start } from "repl";
import { z } from "zod";
import List from "../../../app/(main)/profile/list/page";

const payrollConfigurationFormSchema = () => {
    const TOPAFP = 387050;
    const TOPARL = 77410;
    const TOPARS = 193525;

    const editEntityFormSchema = z.object({
        ars: z.number().optional(),
        arl: z.number().optional(),
        afp: z.number().optional(),
        topAFP: z
            .number({ message: "El tope AFP es un campo requerido" })
            .min(TOPAFP, {
                message: `El tope AFP no puede ser menor a ${TOPAFP}`,
            }),
        topARL: z
            .number({ message: "El tope ARL es un campo requerido" })
            .min(TOPARL, {
                message: `El tope ARL no puede ser menor a ${TOPARL}`,
            }),
        topARS: z
            .number({ message: "El tope ARS es un campo requerido" })
            .min(TOPARS, {
                message: `El tope ARS no puede ser menor a ${TOPARS}`,
            }),
        minimumSalary: z
            .number({ message: "El salario mínimo es un campo requerido" })
            .min(5500, { message: "El salario mínimo es de 5500" }),
        percentageAFP: z.number({ message: "El porcentaje AFP es requerido" }),
        /// nuevos campos agregados
        arlToPercentage: z.number({
            message: "El porcentaje ARL es requerido",
        }),
        percentageARS: z
            .number({ message: "El porcentaje ARS es requerido" })
            .min(1, { message: "El porcentaje ARS no puede ser menor a 0" }),
        infotepPercentage: z.number({
            message: "El porcentaje INFOTEP es requerido",
        }),
        infotepSpecial: z.number({
            message: "El porcentaje INFOTEP Especial es requerido",
        }),
        afpToExpensePercentage: z.number({
            message: "El porcentaje de gastos AFP es requerido",
        }),
        arsToExpensePercentage: z.number({
            message: "El porcentaje de gastos ARS es requerido",
        }),
        salary: z.number({ message: "El salario es requerido" }).optional(),
        infotep: z
            .number({ message: "El concepto INFOTEP es requerido" })
            .optional(),
        afpCompanyDebit: z
            .number({
                message: "El concepto AFP empleador débito es requerido",
            })
            .optional(),
        arsCompanyDebit: z
            .number({
                message: "El concepto ARS empleador débito es requerido",
            })
            .optional(),
        afpCompanyCredit: z
            .number({
                message: "El concepto AFP empleador crédito es requerido",
            })
            .optional(),
        arsCompanyCredit: z
            .number({
                message: "El concepto ARS empleador crédito es requerido",
            })
            .optional(),
        arlCompanyCredit: z
            .number({
                message: "El concepto ARL empleador crédito es requerido",
            })
            .optional(),
        arlCompanyDebit: z
            .number({
                message: "El concepto ARL empleador débito es requerido",
            })
            .optional(),
        isr: z.number({ message: "El concepto ISR es requerido" }).optional(),
        christmasSalary: z
            .number({ message: "El concepto salario de navidad es requerido" })
            .optional(),
        bonification: z
            .number({ message: "El concepto bonificación es requerido" })
            .optional(),
        notice: z
            .number({ message: "El concepto preaviso es requerido" })
            .optional(),
        unemployment: z
            .number({ message: "El concepto cesantia es requerido" })
            .optional(),
        isrInFavor: z
            .number({ message: "El concepto ISR a favor es requerido" })
            .optional(),
        vacation: z
            .number({ message: "El concepto vacaciones es requerido" })
            .optional(),
        previousPeriodDebt: z
            .number({
                message: "El concepto deuda periodo anterior es requerido",
            })
            .optional(),
        outstandingDebt: z
            .number({ message: "El concepto deuda pendiente es requerido" })
            .optional(),
        bonificationCompany: z
            .number({
                message: "El concepto bonificación de empleador es requerido",
            })
            .optional(),
        christmasSalaryCompany: z
            .number({
                message:
                    "El concepto salario de navidad empleador es requerido",
            })
            .optional(),
        infotepCompany: z
            .number({ message: "El concepto INFOTEP empleador es requerido" })
            .optional(),
        start: z
            .date({ message: "La fecha de inicio es requerida" })
            .optional(),
        end: z.date({ message: "La fecha de final es requerida" }).optional(),

        isrBreak: z
            .string(
                z.object({
                    from: z.number({
                        message:
                            "El campo 'From' es requerido y debe ser un número",
                    }),
                    fee: z.number({
                        message:
                            "El campo 'Fee' es requerido y debe ser un número",
                    }),
                    percentage: z.number({
                        message:
                            "El campo 'Percentage' es requerido y debe ser un número",
                    }),
                })
            )
            .optional(),
        salaryToPayEmployee: z
            .number({
                message: "El Concepto salario por pagar débito es requerido",
            })
            .optional(),
        vacationIncentive: z.number({
            message: "El Concepto Incentivo vacacional es requerido",
        }),
        salaryToPayCompany: z.number({
            message: "El Concepto salario por pagar crédito",
        }),
    });

    const addEntityFormSchema = z.object({
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
};

export default payrollConfigurationFormSchema;
