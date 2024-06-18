import { z } from "zod";

const workSchedulerDetailFormSchemas = () => {
    const editEntityFormSchema = z.object({
        idWorkSchedulerDetail: z.number().optional(),
        idWorkScheduler: z.number().optional(),
        week: z.number({ required_error: "El campo es requerido"}),
        start: z.date({ required_error: "El campo es requerido" }),
        end: z.date({ required_error: "El campo es requerido" }),
        days: z.string({ required_error: "El campo es requerido" }),
    });

    const addEntityFormSchema = z.object({
        idWorkScheduler: z.number().optional(),
        week: z.number({ required_error: "El campo es requerido" }),
        start: z.date({ required_error: "El campo es requerido" }),
        end: z.date({ required_error: "El campo es requerido" }),
        days: z.string({ required_error: "El campo es requerido" }),
    });

    return { editEntityFormSchema, addEntityFormSchema };
}

export default workSchedulerDetailFormSchemas;