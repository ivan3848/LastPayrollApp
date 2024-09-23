import { z } from "zod";

const FiredEmployeeFormSchema = () => {
    const addEntityFormSchema = z.object({
        idStatusFired: z.number({ message: "Debe de elegir un concepto." }),
        idCancelationType: z.number({ message: "Debe de elegir un concepto." }),
        idEmployee: z.number().optional(),
        comment: z.string({ message: "El campo tiene que tener un monto." }),
        firedDate: z.date({ message: "El campo debe de tener una fecha." }),
        isTakenVacation: z.boolean().optional(),
        isUnemployment: z.boolean().optional(),
        isPreview: z.boolean().optional(),
        isNotice: z.boolean().optional(),
        isChristmasPayment: z.boolean().optional(),
    });
    return addEntityFormSchema;
};

export default FiredEmployeeFormSchema;
