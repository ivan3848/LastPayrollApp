import { z } from "zod";

const workSchedulerDetailFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idWorkSchedulerDetail: z.number().optional(),
        idWorkScheduler: z.number().optional(),
        week: z.number({ required_error: "El campo es requerido" }),
        start: z.date({ required_error: "El campo es requerido" }),
        end: z.date({ required_error: "El campo es requerido" }),
        days: z.string().min(3, { message: "Seleccione al menos un dia" }),
    });

    const addEntityFormSchema = z.object({
        week: z.number({ required_error: "El campo es requerido" }),
        start: z.any(),
        end: z.any(),
        days: z.string().min(3, { message: "Seleccione al menos un dia" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default workSchedulerDetailFormSchemas;