import { z } from "zod";

const conceptFormSchemas = () => {
    const baseSchema = {
        name: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        idConceptType: z.number({ required_error: "El campo es requerido" }),
        isSpecial: z.boolean().optional(),
        isAbsenteeism: z.boolean().optional(),
        percentValue: z.number().optional(),
        amount: z.number().optional(),
        conceptCode: z
            .string()
            .min(2, { message: "El campo debe tener al menos 2 caracteres" })
            .max(100, {
                message: "El campo debe tener menos de 100 caracteres",
            }),
        isLease: z.boolean().optional(),
        isTax: z.boolean().optional(),
        isCompany: z.boolean().optional(),
        isExtraHour: z.boolean().optional(),
        isInsurance: z.boolean().optional(),
        idAccountingAccount: z.number().optional(),
        isProfit: z.boolean().optional(),
        isForChargeTax: z.boolean().optional(),
        isForChargeTaxIsr: z.boolean().optional(),
        isOnlySecondPayroll: z.boolean().optional(),
        beforeIsr: z.boolean().optional(),
        toProjectTax: z.boolean().optional(),
        toProjectIsr: z.boolean().optional(),
        isBonification: z.boolean().optional(),
        isDeduction: z.boolean().optional(),
        isCommission: z.boolean().optional(),
    };

    const addEntityFormSchema = z.object(baseSchema).refine((data) => {
        if (data.idConceptType === 4858) {
            return data.percentValue !== undefined;
        }
        return true;
    }, {
        message: "El campo es requerido si se trata de un impuesto o un seguro",
        path: ["percentValue"],
    }).refine((data) => {
        if (data.idConceptType === 4858) {
            return data.amount !== undefined;
        }
        return true;
    }, {
        message: "El campo es requerido si se trata de un impuesto o un seguro",
        path: ["amount"],
    });

    const editEntityFormSchema = z.object({
        idConcept: z.number().optional(),
        ...baseSchema,
    }).refine((data) => {
        if (data.idConceptType === 4858) {
            return data.percentValue !== undefined;
        }
        return true;
    }, {
        message: "El campo es requerido si se trata de un impuesto o un seguro",
        path: ["percentValue"],
    }).refine((data) => {
        if (data.idConceptType === 4858) {
            return data.amount !== undefined;
        }
        return true;
    }, {
        message: "El campo es requerido si se trata de un impuesto o un seguro",
        path: ["amount"],
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default conceptFormSchemas;